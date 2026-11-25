// 온톨로지 그래프. 데이터는 docs-site/build.py 가 ontology/ontology.yaml 에서 만든 ontology.json 이다.
// index.html 이 온톨로지 쪽에 올 때 openOntology 를, 떠날 때 closeOntology 를 부른다.
(function () {
  var LAYERS = [
    { key: "tables", label: "DB 테이블" },
    { key: "api", label: "API" },
    { key: "mcp_tools", label: "에이전트의 도구" },
    { key: "mqtt", label: "설비 메시지" },
    { key: "sse", label: "화면 이벤트" },
  ];
  var PALETTE = ["#4a6fa5", "#2f6f6a", "#b8873b", "#8a5a83", "#8d9299", "#a8554b"];

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === "text") node.textContent = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) {
      node.appendChild(child);
    });
    return node;
  }

  function list(items) {
    return el(
      "ul",
      {},
      items.map(function (item) {
        return el("li", {}, [el("code", { text: item })]);
      })
    );
  }

  function table(headers, rows) {
    var head = el("tr", {}, headers.map(function (h) { return el("th", { text: h }); }));
    var body = rows.map(function (row) {
      return el("tr", {}, row.map(function (cell) { return el("td", { text: cell == null ? "" : String(cell) }); }));
    });
    return el("div", { class: "table-wrap" }, [el("table", {}, [el("thead", {}, [head]), el("tbody", {}, body)])]);
  }

  var cy = null;

  // 쪽을 떠나면 그래프를 치운다. 치우지 않으면 올 때마다 하나씩 남는다.
  window.closeOntology = function () {
    if (cy) { cy.destroy(); cy = null; }
  };

  window.openOntology = function (url) {
    window.closeOntology();
    fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error("ontology.json 응답 " + response.status);
        return response.json();
      })
      .then(function (data) {
        // 받는 사이에 다른 쪽으로 넘어갔으면 그리지 않는다.
        if (!document.getElementById("onto-graph")) return;
        if (typeof cytoscape === "undefined") throw new Error("그래프 라이브러리(cytoscape)를 불러오지 못했습니다");
        render(data);
      })
      .catch(function (error) {
        console.error(error);
        var box = document.getElementById("onto-graph");
        if (box) box.textContent = "온톨로지 그래프를 그리지 못했습니다: " + error.message;
      });
  };

  function render(data) {
    var groups = [];
    data.nodes.forEach(function (node) {
      if (groups.indexOf(node.group) < 0) groups.push(node.group);
    });
    var colorOf = function (group) { return PALETTE[groups.indexOf(group) % PALETTE.length]; };
    var byId = {};
    data.nodes.forEach(function (node) { byId[node.id] = node; });

    cy = cytoscape({
      container: document.getElementById("onto-graph"),
      elements: data.nodes
        .map(function (node) {
          return { data: { id: node.id, label: node.ko, color: colorOf(node.group), planned: node.planned ? 1 : 0 } };
        })
        .concat(
          data.edges.map(function (edge, index) {
            return { data: { id: "e" + index, source: edge.from, target: edge.to, label: edge.name } };
          })
        ),
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "background-color": "data(color)",
            color: "#fff",
            "font-size": 15,
            "text-valign": "center",
            "text-halign": "center",
            "text-wrap": "wrap",
            "text-max-width": 84,
            width: 92,
            height: 92,
          },
        },
        { selector: "node[planned = 1]", style: { "border-width": 2, "border-style": "dashed", "border-color": "#495057", "background-opacity": 0.45, color: "#212529" } },
        { selector: "edge", style: { width: 1.2, "line-color": "#adb5bd", "target-arrow-color": "#adb5bd", "target-arrow-shape": "triangle", "curve-style": "bezier", "arrow-scale": 0.8 } },
        { selector: "edge.near", style: { "line-color": "#343a40", "target-arrow-color": "#343a40", width: 2, label: "data(label)", "font-size": 12, "text-background-color": "#fff", "text-background-opacity": 0.9, "text-background-padding": 2, color: "#343a40" } },
        { selector: ".dim", style: { opacity: 0.12 } },
        { selector: "node.picked", style: { "border-width": 4, "border-color": "#212529", "border-style": "solid" } },
      ],
      layout: { name: "cose", animate: false, nodeRepulsion: 14000, idealEdgeLength: 110, padding: 16, randomize: false },
      wheelSensitivity: 0.2,
      minZoom: 0.3,
      maxZoom: 2.5,
    });

    // 계층 단추
    var toolbar = document.getElementById("onto-toolbar");
    var active = null;
    var buttons = [{ key: null, label: "전체" }].concat(LAYERS).map(function (layer) {
      var count = layer.key ? data.nodes.filter(function (n) { return n[layer.key].length > 0; }).length : data.nodes.length;
      var button = el("button", { type: "button", class: "onto-button", text: layer.label + " " + count });
      button.addEventListener("click", function () {
        active = layer.key;
        buttons.forEach(function (b) { b.classList.remove("on"); });
        button.classList.add("on");
        cy.elements().removeClass("dim near picked");
        showHint();
        if (!active) return;
        cy.nodes().forEach(function (node) {
          if (byId[node.id()][active].length === 0) node.addClass("dim");
        });
        cy.edges().forEach(function (edge) {
          if (edge.source().hasClass("dim") || edge.target().hasClass("dim")) edge.addClass("dim");
        });
      });
      toolbar.appendChild(button);
      return button;
    });
    buttons[0].classList.add("on");

    // 묶음의 색 안내
    var legend = el("span", { class: "onto-legend" }, groups.map(function (group) {
      var dot = el("i", {});
      dot.style.background = colorOf(group);
      return el("span", {}, [dot, document.createTextNode(group)]);
    }));
    toolbar.appendChild(legend);

    // 객체를 누르면 계층별 구현을 보여 준다
    var detail = document.getElementById("onto-detail");
    function showHint() {
      detail.innerHTML = "";
      detail.appendChild(el("p", { class: "onto-hint", text: "객체를 눌러 보세요." }));
    }
    cy.on("tap", "node", function (event) {
      var node = byId[event.target.id()];
      cy.elements().removeClass("near picked");
      event.target.addClass("picked");
      event.target.connectedEdges().addClass("near");

      detail.innerHTML = "";
      detail.appendChild(el("h3", { text: node.ko + " (" + node.id + ")" }));
      if (node.planned) detail.appendChild(el("p", { class: "onto-planned", text: "아직 만들지 않았습니다." + (node.planned_stage != null ? " " + node.planned_stage + "단계에서 추가합니다." : "") }));
      detail.appendChild(el("p", { text: node.description }));
      if (node.isa95) detail.appendChild(el("p", { class: "onto-small", text: "ISA-95: " + node.isa95 }));
      LAYERS.forEach(function (layer) {
        if (node[layer.key].length === 0) return;
        detail.appendChild(el("h4", { text: layer.label }));
        // 테이블은 스키마 파일에 실제로 있는지를 함께 보여 준다 (build.py 가 확인한다).
        var built = layer.key === "tables" ? node.built_tables || [] : null;
        detail.appendChild(list(node[layer.key].map(function (item) {
          return built ? item + (built.indexOf(item) >= 0 ? "  (만들어짐)" : "  (아직)") : item;
        })));
      });
      var related = data.edges.filter(function (e) { return e.from === node.id || e.to === node.id; });
      if (related.length > 0) {
        detail.appendChild(el("h4", { text: "관계" }));
        detail.appendChild(
          el("ul", {}, related.map(function (e) {
            var text = byId[e.from].ko + " → " + byId[e.to].ko + " (" + e.name + ")" + (e.ko ? ": " + e.ko : "");
            return el("li", { text: text });
          }))
        );
      }
    });
    cy.on("tap", function (event) {
      if (event.target === cy) {
        cy.elements().removeClass("near picked");
        showHint();
      }
    });

    document.getElementById("onto-meta").textContent =
      "객체 " + data.nodes.length + "개, 관계 " + data.edges.length + "개. 끌어서 옮기고 휠로 확대합니다.";

    // 행위와 메시지 표
    document.getElementById("onto-actions").appendChild(
      table(
        ["행위", "대상", "누가", "승인", "설명"],
        Object.keys(data.actions).map(function (key) {
          var a = data.actions[key];
          var target = byId[a.on] ? byId[a.on].ko : a.on;
          var role = data.roles[a.role] ? data.roles[a.role].ko : a.role;
          return [a.ko, target, role, a.approval, a.description];
        })
      )
    );
    document.getElementById("onto-messages").appendChild(
      table(
        ["토픽", "보내는 쪽", "종류", "QoS", "retained", "객체"],
        Object.keys(data.messages).map(function (key) {
          var m = data.messages[key];
          return [m.topic, m.from, m.kind, m.qos, m.retained ? "예" : "아니오", byId[m.object] ? byId[m.object].ko : m.object];
        })
      )
    );
  }
})();
