# 도메인 용어집

사출성형 공장의 ERP/MES 용어를 정리한 참고 자료입니다. 테이블과 컬럼 설계는 담지 않았습니다.

- 2026-11-24에 공개 자료와 대조해 고쳤습니다. 처음에는 기억으로 쓴 초안이었습니다.
- 모든 줄에 **근거**를 적었습니다. 읽는 법은 아래와 같습니다.

| 근거 칸의 표기 | 뜻 |
| --- | --- |
| `[숫자]` | 공개 자료. 파일 끝의 출처 목록에 제목과 주소가 있습니다 |
| `[P숫자]` | 이 프로젝트가 직접 확인하거나 정한 것. 근거 문서를 가리킵니다 |
| 약함 | 출처가 블로그나 기사이거나, 본문을 열지 못해 검색 결과의 요약만 읽은 것 |
| 프로젝트 정의 | 표준 용어가 아니라 이 프로젝트가 이렇게 쓰기로 한 것 |
| 확인 못 함 | 공개 자료로 확인하지 못한 것. 현장에서 통용되는 뜻으로 적었습니다 |

## 출처의 한계

- **ISA-95(IEC 62264)는 유료 표준입니다.** 전문이 아니라 공개된 목차와 적용 범위, 그리고 OPC 재단이 ISA-95를 옮긴 규격으로 확인했습니다.
- **한국어 현장 용어의 표준 문서를 구하지 못했습니다.** KS X 9001(스마트공장 용어), NCS 학습모듈, KAMP 가이드북을 열지 못했습니다. 한국어 용어는 대부분 영어 원문의 뜻을 확인하고 통용되는 번역어를 붙인 것입니다.
- **사출성형 불량의 한국어 이름**은 기술 블로그와 업계 기사에 기대고 있어 약합니다.
- **설비 상태**의 표준(SEMI E10, ISO 22400-2)도 유료입니다. OPC 재단의 대응표와 특허 문서의 요약으로 확인했습니다.
- SAP과 Oracle의 용어집은 공식 문서이지만 오래된 판(SAP R/3 4.6C·4.7, Oracle E-Business Suite R12)입니다.

"ISA-95" 칸은 국제 표준에서 대응하는 개념이고, 온톨로지의 객체 이름을 정할 때 참고합니다. Part 2는 ERP와 MES 사이, Part 4는 MES 안쪽을 다룹니다.

## 기준정보 (마스터 데이터)

거래가 일어나기 전에 미리 등록해 두는, 잘 바뀌지 않는 데이터입니다.

| 용어 | 영어 | ISA-95 | 뜻 | 이 프로젝트 | 근거 |
| --- | --- | --- | --- | --- | --- |
| 품목 | Item, Material | Material Definition (Part 2) | 사고, 만들고, 파는 모든 물건의 정의. 원자재, 반제품, 완제품을 모두 포함한다 | 30~40개 | [14], ISA-95 이름은 [2] |
| 원자재 | Raw Material | Material Definition | 외부에서 사서 가공에 쓰는 품목 | 수지, 마스터배치, 클립 | [18] |
| 반제품 | Semi-finished Product | Material Definition | 외부에서 사거나 사내에서 만들어 다음 공정에 쓰는 품목 | 성형품. 이 프로젝트에서는 팔지 않고 조립에만 쓴다 | [18] |
| 완제품 | Finished Product | Material Definition | 사내에서 만들어 고객의 주문을 받는 품목 | 조립품 | [18], [15] |
| BOM (자재명세서) | Bill of Materials | Operations Material Bill (Part 2) | 품목 하나를 만드는 데 필요한 하위 품목과 수량의 목록. 여러 단계로 쌓인다 | 수지 + 마스터배치 → 성형품, 성형품 + 클립 → 완제품 (2단계) | [14], ISA-95 이름은 [2] |
| 소요량 | Quantity Per | | BOM에서 상위 품목 1개에 들어가는 하위 품목의 양 | | [14] |
| 라우팅 (공정 순서) | Routing | Operations Definition, Operations Segment (Part 2) | 품목을 만들 때 거치는 공정의 순서와 표준 시간 | 사출 → 조립. 별도 테이블은 없고 금형-설비 관계가 이 역할을 한다 | ISA-95 이름은 [2]. 뜻은 확인 못 함 |
| 공정 | Operation | Process Segment (Part 2) | 제조 과정의 한 단계. 작업을 하고 자원을 쓰는 단위 | 사출, 조립 | [14], ISA-95 이름은 [2] |
| 라인 | Production Line | Production Line (Work Center의 한 종류) | 같은 제품군을 만드는 설비의 묶음 | 사출 3개 라인, 조립 2개 라인 | [1], [4] |
| 설비 | Equipment, Machine | Work Cell (Work Unit의 한 종류) | 실제로 가공하는 기계 한 대 | 사출성형기 14대, 조립 설비 6대 | [1], [4] |
| 금형 | Mold | Physical Asset (Part 2) | 녹은 플라스틱을 정해진 모양으로 만드는 금속 틀. 품목마다 다르다 | 독립된 객체로 둔다. 조립의 받침대도 여기에 넣는다 | [38], ISA-95 이름은 [2] |
| 캐비티 | Cavity | | 금형 안에서 제품 하나가 만들어지는 공간. 캐비티가 4개면 사이클 한 번에 4개가 나온다 | 금형마다 캐비티 수를 둔다. 같은 품목만 찍는 금형으로 본다. 사이클 수 × 캐비티 수 = 생산 수량 | [38], [39] |
| 패밀리 금형 | Family Mold | | 서로 다른 부품 두 개 이상을 한 번에 찍는 금형. 좌(LH)와 우(RH)를 함께 찍는 경우가 여기에 해당한다 | 다루지 않는다. KAMP 데이터의 공장은 이 방식으로 보였다 | [49], 좌우 부품을 직접 예로 든 출처는 찾지 못함. KAMP의 관찰은 [P1] |
| 교대조 | Shift | | 정해진 근무 시간대 | 2교대 06~22시 | [14] |
| 작업 달력 | Workday Calendar, Factory Calendar | | 근무일을 정한 달력 | 주 5일, 야간과 휴일은 비가동 | [14], [19] |
| 표준 사이클 타임 | Standard Cycle Time | | 금형과 설비 조합에서 사이클 한 번에 걸려야 하는 기준 시간. 표준(ISO 22400-2)은 품목 1개당 시간으로 정의하므로, 품목 1개당 시간 = 사이클 타임 ÷ 캐비티 수다 | 금형-설비 조합마다 둔다. 범위 25~65초는 KAMP 데이터의 분포를 보고 이 프로젝트가 정한 값이다 | [7] 약함(간접), 범위는 프로젝트 정의 [P1] |

## 영업과 계획

| 용어 | 영어 | ISA-95 | 뜻 | 이 프로젝트 | 근거 |
| --- | --- | --- | --- | --- | --- |
| 수주 | Sales Order | | 정해진 때에 물건을 납품해 달라는 고객의 요청 | 머리와 줄로 나뉜다. 수요 생성기가 매일 만든다 | [20] |
| 납품지시 | Delivery Schedule | | 고객이 정해진 날짜에 정해진 수량을 납품하라고 내리는 지시. SAP은 공급 계약 아래의 예측 납품 일정과 JIT 납품 일정으로 나눈다 | 수주의 근거 | [28]. "납품지시"라는 한국어가 이것에 대응한다는 것은 확인 못 함 |
| 납기일 | Request Date, Promise Date | | 고객이 요청한 날짜(요청일)와 회사가 약속한 날짜(약속일) 두 가지가 있다 | 고객이 납품지시에서 요청한 날짜. 수주의 줄마다 있다 | [17] |
| 생산오더 | Production Order | Operations Request (Part 2) | 어떤 품목을 언제까지 몇 개 만들라는 지시. SAP에서 제조오더(Manufacturing Order)는 생산오더와 공정오더를 아우르는 상위 개념이다 | 수주 줄에서 전개된다. 필요 수량을 채울 때까지 열려 있다 | [27], ISA-95 이름은 [2] |
| 작업지시 | Work Order, Job Order | Job Order (Part 4) | 실행할 작업 한 단위에 대한 요청. 생산오더를 설비와 시간대에 배정한 것 | 하루 단위. core가 MQTT로 설비에 내려보낸다 | [5], [3]. "ERP는 생산오더, MES는 작업지시"라는 구분은 현장의 관행이며 출처는 확인 못 함 |
| 계획 수량 | Planned Quantity | | 지시에서 만들기로 한 수량 | 필요 수량 ÷ 금형의 예상 수율 | [16] |
| 전개 | BOM Explosion | | 상위 지시를 BOM에 따라 하위 지시로 펼치는 일 | 계획 배치가 수행 | 확인 못 함 |
| 일정 계획 | Detailed Scheduling | Work Schedule (Part 4) | 작업지시를 설비와 시간에 배정하는 일. ERP가 MES에 내려보내는 요청의 묶음은 Operations Schedule(Part 2)로 따로 부른다 | 계획 배치가 수행 | [3], [2] |
| 셋업 (기종 변경) | Setup, Changeover | | 한 품목의 생산에서 다른 품목의 생산으로 바꾸는 작업. 걸리는 시간이 셋업 시간이다 | 설비 상태의 하나. 금형을 바꿔 끼운다 | [14] |
| 출하 | Outbound Delivery, Shipment | | 물건을 꺼내고, 재고를 줄이고, 보내는 일 | 출하 배치가 납기일에 수행. 한 줄을 여러 번에 나눠 보낼 수 있다 | [21] |

## 생산 실행

| 용어 | 영어 | ISA-95 | 뜻 | 이 프로젝트 | 근거 |
| --- | --- | --- | --- | --- | --- |
| 사이클 | Cycle | | 사출성형기가 한 번 찍는 과정. 형폐 → 사출(충전) → 보압 → 냉각(이 동안 계량을 함께 한다) → 형개 → 취출 | 사이클마다 메시지 하나를 발행 | [47], [39] |
| 쇼트 | Shot | | 한 사이클에 사출되는 수지의 양. 현장에서는 사이클과 같은 뜻으로도 쓴다 | | [50] 약함 |
| 설비 사이클 로그 | Cycle Log | 대응하는 객체 없음. 설비 제어 수준(Level 2)의 데이터 | 설비가 사이클마다 보내는 원시 기록. 공정값만 담는다 | 약 400만 건. 튜닝 대상 | 프로젝트 정의 [P3] |
| 생산실적 | Production Result | Job Response (Part 4). ERP에 올릴 때는 Operations Response (Part 2) | 작업지시에 대해 실제로 만든 양품과 불량 수량 | 작업지시와 교대 단위로 집계. 재고에는 이것만 반영 | [3], [2], [6] |
| 양품 수량 | Good Quantity, Yield | | 검사를 통과한 수량. SAP은 이 수량을 yield라고 부른다 | | [22] |
| 불량 수량 | Nonconforming Quantity, Scrap | | 요구 사항을 충족하지 못한 수량. 스크랩은 그중 다시 고칠 수 없는 것이다 | 재작업이 없으므로 불량과 스크랩을 같은 것으로 본다 | [8], [16] |
| 진척률 | Progress | | 계획 수량 대비 양품 수량의 비율 | | 프로젝트 정의. 표준 용어를 찾지 못함 |
| 실적 마감 | Confirmation, Closing | | 작업지시나 교대가 끝나 실적을 확정하는 일. SAP의 오더 확인(Confirmation)이 가장 가깝다 | 마감 때 재고에 반영 | 프로젝트 정의. 가까운 개념은 [22] |
| 재공 | WIP (Work in Process) | | 가공을 기다리는 원자재부터 입고 직전의 조립품까지, 생산 과정에 있는 물량 | | [15] |

## 설비와 가동

| 용어 | 영어 | 뜻 | 이 프로젝트 | 근거 |
| --- | --- | --- | --- | --- |
| 가동 | Productive Time | 설비가 제품을 만들고 있는 상태 | 설비 상태 `RUNNING` | [7], [37] 약함 |
| 대기 | Standby | 일할 수 있는 상태인데 작업지시, 자재, 작업자가 없어 쉬는 상태 | 설비 상태 `IDLE` | [7], [37] 약함 |
| 고장 (비계획 정지) | Unscheduled Downtime | 설비가 제 기능을 할 수 없는 상태. 수리 중인 시간을 포함한다 | 설비 상태 `DOWN`. 사건 주입의 하나 | [7], [37] 약함 |
| 계획 정지 | Scheduled Downtime | 일할 수는 있지만 미리 정한 이유로 쓰지 않는 시간. SEMI E10은 셋업과 예방 정비를 여기에 넣는다 | 셋업은 별도 상태 `SETUP`으로 둔다 | [37] 약함 |
| 비가동 | Non-scheduled Time | 생산 계획이 없는 시간. 쉬는 교대, 주말, 휴일 | 설비 상태 `OFF`. 야간과 휴일 | [37] 약함 |
| 정지 사유 | Downtime Reason | 설비가 멈춘 이유의 분류. 고장, 셋업, 품질 문제 등 | 설비 상태 기록의 사유 칸 | [31] 약함 |
| 예방 정비 | Preventive Maintenance | 정기적으로 반복하는 점검, 정비, 계획 수리 | | [23] |
| 시간가동률 | Availability | 가동시간 ÷ 부하시간. 부하시간은 가동해야 할 시간이다 | 현황판 지표. 부하시간에서 계획 정지를 빼는지는 자료마다 달라, 지표를 만들 때 정해야 한다 | [32] 약함(본문을 열지 못함) |
| 성능가동률 | Performance | (기준 사이클 타임 × 생산 수량) ÷ 가동시간 | | [32] 약함 |
| 양품률 | Quality | 생산 수량 중 양품의 비율 | | [32] 약함 |
| 설비종합효율 | OEE | 시간가동률 × 성능가동률 × 양품률 | | [32] 약함 |

"가동률"이라고만 쓰면 시간가동률, 부하율, 설비 이용률 중 무엇인지 모호합니다. 이 프로젝트의 지표 이름은 시간가동률로 씁니다.

## 품질

| 용어 | 영어 | 뜻 | 이 프로젝트 | 근거 |
| --- | --- | --- | --- | --- |
| 불량률 | Defect Rate | 생산 수량 중 불량 수량의 비율 | 라인별·일자별 집계가 튜닝 대상 쿼리 | 프로젝트 정의. 표준 정의를 찾지 못함 |
| 수율 | Yield Rate | 투입한 것 중 실제로 제품이 되는 비율. SAP에서 yield는 비율이 아니라 양품 수량을 뜻한다 | 금형마다 예상 수율을 둔다. 지시 수량 = 필요 수량 ÷ 수율 | [14], [22] |
| 불량 유형 | Defect Type | 불량의 종류 | 아래 5종과 초기허용불량 | 프로젝트 정의 [P3] |
| 미성형 | Short Shot | 수지가 캐비티를 다 채우지 못해 형상이 덜 나온 불량 | 불량 유형 | [40] 약함, [44] |
| 은줄 | Silver Streak | 수지의 수분, 열분해 가스, 말려든 공기가 흐름 방향으로 은백색 줄을 남기는 불량. 건조 부족이 대표 원인이고 과열이나 가스 빠짐 불량으로도 생긴다 | 불량 유형. 심어 둔 원인(건조 불량 LOT)의 결과 | [40] 약함, [42] |
| 버 | Flash, Burr | 금형 틈으로 수지가 새어 나와 얇은 막이 붙는 불량 | 불량 유형 | [40] 약함 |
| 싱크마크 (수축 자국) | Sink Mark | 두꺼운 부위가 식으면서 표면이 움푹 들어가는 불량. "수축"은 현상을 가리키는 말이라 불량 이름으로는 싱크마크를 쓴다 | 불량 유형 | [40] 약함, [43] 약함 |
| 웰드라인 | Weld Line | 수지 흐름이 만나는 자리에 선이 남는 불량 | 불량 유형 | [40] 약함 |
| 초기허용불량 | (정해진 영어 없음) | 셋업 직후 조건이 안정되기 전에 나와서 버리는 물량. KAMP 데이터셋의 불량 사유에 있던 이름이다 | 불량 유형. 작업지시의 처음 몇 사이클에서 발생. 공정 불량과 따로 센다 | [P1]. 표준 용어는 확인 못 함 |
| 가스 불량 | Gas-related Defects | 현장에서 가스로 생기는 여러 현상을 묶어 부르는 말. 은줄, 갇힌 공기가 압축되어 끝단이 검게 타는 태움, 가스 자국은 원인과 모양이 서로 다르다 | 불량 유형에 넣지 않았다. KAMP 데이터셋의 불량 사유에 "가스"가 있었지만 정확히 무엇을 뜻하는지는 확인하지 못했다 | [40] 약함, [41] 약함, [P1] |
| 추적성 | Traceability | 대상의 이력, 적용, 위치를 따라갈 수 있는 능력. 자재의 출처와 가공 이력을 포함한다 | 불량 원인 조사의 근거. 제품에서 자재 LOT 쪽으로 거슬러 올라가는 방향만 다룬다 | [8] |
| 원인 분석 | Root Cause Analysis | 문제를 일으킨 근본 원인을 찾아 없애는 일 | 에이전트의 불량 원인 조사 | [36] 약함 |

## 자재와 재고

| 용어 | 영어 | ISA-95 | 뜻 | 이 프로젝트 | 근거 |
| --- | --- | --- | --- | --- | --- |
| LOT (배치) | Lot, Batch | Material Lot (Part 2) | 번호로 식별하는 품목의 한 묶음. 추적의 단위다 | 원자재만 LOT로 추적한다 | [15], ISA-95 이름은 [2] |
| 자재 LOT | Material Lot | Material Lot | 공급사에서 한 번에 입고된 원자재 묶음 | 불량 원인의 후보 | [2] |
| 입고 | Goods Receipt | | 물건이 창고로 들어오는 일 | 입고 배치가 자재 LOT를 넣는다 | [24] |
| 불출 | Material Issue | | 창고에서 현장으로 자재를 내보내는 일 | 투입과 같은 시점으로 본다 | 확인 못 함 |
| 투입 | Material Charge | Material Actual (Part 2) 중 소비된 것 | 자재를 설비의 호퍼에 부어 생산에 쓰는 일. 재고가 줄어든다 | 투입 사건으로 기록 (설비, LOT, 시각, 양) | 프로젝트 정의 [P3], ISA-95 이름은 [2] |
| 백플러시 | Backflush | | 자재를 실제로 꺼낸 때가 아니라 생산 완료를 보고하는 때에 자재 사용을 자동으로 기록하는 방식 | 조립이 쓴 성형품을 실적 마감 때 BOM 수량만큼 뺀다 | [29] |
| 재고 | On-hand Quantity, Stock | | 창고에 실제로 있는 품목의 수량 | 품목마다 현재고 한 줄 | [15] |
| 재고 이동 | Goods Movement | | 재고 수준을 바꾸는 물건의 움직임. 입고, 출고, 이동, 조정 | 자재 입고, 자재 투입, 생산 입고, 조립 사용, 출하 | [25], [15] |
| 예약 (할당) | Reservation | | 특정 수주 몫으로 보장해 둔 재고 | 수주 줄마다 잡는다. 계획할 때 있던 재고와, 그 줄을 위해 생산한 것 | [15] |
| 가용 재고 | Available Stock | | 쓸 수 있는 재고 | 현재고 − 예약. SAP의 MRP는 입고 예정까지 더해 계산하는데 이 프로젝트는 넣지 않는다 | 프로젝트 정의 [P3]. SAP의 정의는 [30] |
| 순소요량 | Net Requirement | | 필요한 수량에서 가용 재고와 입고 예정을 뺀, 새로 조달해야 하는 수량. MRP의 핵심 계산 | 수주 줄의 새로 만들 수량. 생산 중인 수량은 계산에 넣지 않는 단순한 형태 | [30] |
| 재주문점 | Reorder Point | | 재고와 이미 주문한 입고 예정의 합이 이 수준 아래로 내려가면 주문을 내는 기준선 | 원자재 입고 방식. 오는 중인 주문이 있으면 또 주문하지 않는다 | [26] |
| 조달 리드타임 | Procurement Lead Time | | 품목을 조달하는 데 걸리는 시간. 만드는 데 걸리는 시간은 제조 리드타임이라고 따로 부른다 | 자재 주문에서 입고까지 | [14] |

## 사출성형 공정

| 용어 | 영어 | 뜻 | 근거 |
| --- | --- | --- | --- |
| 수지 | Resin | 사출성형의 주원료인 플라스틱. 보통 알갱이(펠릿) 형태로 공급된다 | [38], [51] 약함 |
| 마스터배치 | Masterbatch | 색소나 첨가제를 고농도로 담은 알갱이. 수지에 섞어 색이나 기능을 준다 | [39] |
| 성형품 | Molded Part | 수지를 금형에 쏴서 굳힌 플라스틱 몸통. 이 프로젝트의 반제품 | 프로젝트 정의 [P3] |
| 클립 | Clip | 몸통을 차체에 고정하는 작은 부품. 조립에서 몸통 뒷면에 끼운다 | [52]. 이 프로젝트의 제품에 클립을 쓴다는 것은 가정 |
| 인서트 | Insert | 사출 전에 금형에 넣어 제품과 한 몸이 되게 하는 부품. 주로 금속이다. 이 프로젝트에서는 쓰지 않는다 | [38], [39] |
| 건조 | Drying | 성형 전에 수지의 수분을 없애는 작업. 부족하면 은줄과 기포가 늘고, 물을 잘 머금는 수지는 강도가 떨어진다 | [40] 약함, [45] |
| 호퍼 | Hopper | 수지를 성형기에 공급하는 깔때기 모양의 통 | [38] |
| 배럴 | Barrel | 수지를 넣어 가열하는 원통 | [38] |
| 배럴 온도 | Barrel Temperature | 배럴의 히터 구간마다 설정하고 측정하는 온도. 받은 데이터에는 구간별 값이 들어 있었다 | [46], [P1] |
| 수지 온도 | Melt Temperature | 실제로 녹은 수지의 온도. 마찰열이 더해져 배럴 온도와 다르다. 한 연구에서는 약 44°C 차이가 났다 | [46]. 이 프로젝트는 수지 온도를 측정값으로 두지 않고 배럴 온도를 쓴다 |
| 금형 온도 | Mold Temperature | 금형 안쪽 표면의 온도. 냉각 속도와 표면 품질에 영향을 준다 | [39] |
| 사출 압력 | Injection Pressure | 녹은 수지를 금형에 밀어 넣는 힘 | [38] |
| 보압 | Holding Pressure | 채운 뒤 수축을 보충하려고 유지하는 압력 | [38] |
| 계량 | Plasticization | 수지를 녹여 스크루 앞에 모으는 과정. 보압이 끝난 뒤 냉각과 겹쳐서 진행된다 | [38], [39], [47] |
| 쿠션 | Cushion | 사출과 보압이 끝났을 때 스크루 앞에 남는 수지. 설비는 보통 스크루 위치로 표시한다. 설정값이 아니라 결과값이다 | [48] 약함 |
| 형체력 | Clamping Force | 채우는 동안 금형이 열리지 않게 누르는 힘. 받은 데이터의 설비 이름이 "650톤"처럼 이 값으로 되어 있었다 | [38], 톤수로 부르는 것은 [P1] |
| 사이클 타임 | Cycle Time | 제품 하나를 꺼낸 때부터 다음 제품을 꺼낼 때까지의 시간 | [39] |

## 제품

| 용어 | 영어 | 뜻 | 근거 |
| --- | --- | --- | --- |
| 윈드실드 사이드 몰딩 | Windshield Side Molding | 앞유리의 왼쪽과 오른쪽 가장자리에 붙는 마감 띠. 부품 목록에 좌우가 따로 있고 고정 클립이 별도 품목으로 있다 | [52] |
| 루프랙 커버 | Roof Rack Cover | 지붕 위 루프랙의 끝단이나 가운데를 덮는 마감 부품 | [53]. 가운데 커버는 KAMP 데이터의 품목 이름에서 본 것 [P1]. 붙이는 방식은 확인 못 함 |

## 시스템

| 용어 | 영어 | 뜻 | 근거 |
| --- | --- | --- | --- |
| ERP | Enterprise Resource Planning | 회사의 여러 관리 업무와 운영 업무를 자동화하고 지원하는 시스템. "무엇을 언제까지 몇 개"를 정한다 | [35] 약함 |
| MES | Manufacturing Execution System | 오더가 나간 때부터 완제품이 나올 때까지 현장의 생산 실행을 관리하는 시스템 | [34] |
| ISA-95 | IEC 62264 | 기업 시스템(Level 4)과 제조 운영(Level 3) 사이, 그리고 제조 운영 안쪽의 역할과 정보 모델을 정한 국제 표준 | [1] |
| PLC | Programmable Logic Controller | 설비를 직접 제어하는 산업용 컴퓨터. 이 프로젝트는 시뮬레이터가 대신한다 | [13] |
| MQTT | | 발행과 구독 방식의 가벼운 메시징 프로토콜. OASIS 표준이다 | [10] |
| 안돈 | Andon | 작업 구역의 상태를 한눈에 보여 주고 이상이 생기면 알리는 시각 관리 도구. 현황판, 표시등, 호출 줄을 포함한다 | [33] |
| 브로커 | Broker (규격의 Server) | 발행한 쪽과 구독한 쪽 사이에서 메시지를 넘겨주는 중개자. 이 프로젝트는 RabbitMQ를 쓴다 | [9], [P2] |
| 토픽 | Topic | MQTT에서 메시지에 붙는 이름. `factory/eq07/cycle`처럼 `/`로 나눈다 | [9] |
| 대기열 | Queue | 받는 쪽이 꺼내 갈 때까지 메시지를 쌓아 두는 곳. MQTT가 아니라 RabbitMQ(AMQP)의 개념이다. QoS 1로 받은 것은 처리 확인을 보내야 지워진다 | [11] |
| QoS | Quality of Service | MQTT에서 메시지를 얼마나 확실히 전달할지의 수준. 0은 최대 한 번(잃을 수 있음), 1은 최소 한 번(중복될 수 있음). 2는 RabbitMQ가 지원하지 않는다 | [9], [11] |
| retained | Retained Message | 토픽마다 마지막 메시지 하나를 브로커가 붙여 두는 것. 나중에 구독한 쪽도 받는다. RabbitMQ에서는 정확한 토픽으로 구독해야 받는다 | [9], [11], [P2] |
| 유언 | Last Will (LWT) | 기기가 갑자기 끊기면 브로커가 대신 발행하도록 미리 맡겨 둔 메시지. 정상적으로 연결을 끊으면 발행되지 않는다 | [9], [P2] |
| 사건 | Event | "한 번 찍었다", "고장 났다"처럼 일이 일어났다는 보고. 하나도 놓치면 안 된다 | 프로젝트 정의 [P4] |
| 계측값 | Telemetry | "지금 온도 230도"처럼 일정한 간격으로 보내는 그 순간의 값. 놓쳐도 다음 값이 온다 | 프로젝트 정의 [P4] |
| MCP | Model Context Protocol | AI 애플리케이션을 바깥 시스템에 잇는 공개 표준. 서버가 도구, 리소스, 프롬프트를 내놓고 모델이 골라 부른다 | [12] |

## 출처

### 표준과 규격

| 번호 | 자료 | 주소 |
| --- | --- | --- |
| [1] | IEC 62264-1 (ISA-95 Part 1) 미리보기. 적용 범위와 설비 계층 | https://assets.vde-verlag.de/iec-normen/preview-pdf/info_iec62264-1%7Bed2.0%7Db.pdf |
| [2] | IEC 62264-2 (ISA-95 Part 2) 미리보기. 객체 목록 | https://assets.vde-verlag.de/iec-normen/preview-pdf/info_iec62264-2%7Bed2.0%7Db.pdf |
| [3] | IEC 62264-4 (ISA-95 Part 4) 미리보기 | https://assets.vde-verlag.de/iec-normen/preview-pdf/info_iec62264-4%7Bed1.0%7Db.pdf |
| [4] | OPC 10030 (ISA-95 Common Object Model) 7.4.1절. 생산 라인과 작업 단위 | https://reference.opcfoundation.org/specs/OPC-10030/7.4.1 |
| [5] | OPC 10031-4 (ISA-95 Job Control) 4.1절. Job Order의 정의 | https://reference.opcfoundation.org/specs/OPC-10031-4/4.1 |
| [6] | ISA InTech, "Advancements in ISA-95" (2017) | https://www.isa.org/intech-home/2017/january-february/features/advancements-in-isa-95 |
| [7] | OPC 40001-1 (OPC UA for Machinery) 부록 C. ISO 22400-2와 SEMI E10의 대응 | https://reference.opcfoundation.org/specs/OPC-40001-1/c-2 |
| [8] | ISO 9000:2015 용어(nonconformity, defect, traceability). 유럽철도청 용어집에 재수록된 것 | https://www.era.europa.eu/era-railway-terminology-collection/traceability/term/sms_safety_culture_human_and_organisational_factor |
| [9] | OASIS MQTT 3.1.1 규격 | https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html |
| [10] | OASIS MQTT 5.0 규격 | https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html |
| [11] | RabbitMQ 문서, MQTT Plugin | https://www.rabbitmq.com/docs/mqtt |
| [12] | Model Context Protocol 문서, Architecture | https://modelcontextprotocol.io/docs/learn/architecture |
| [13] | OPC 30000 3.2절. IEC 61131의 PLC 정의 | https://reference.opcfoundation.org/specs/OPC-30000/3.2 |

### ERP 문서

| 번호 | 자료 | 주소 |
| --- | --- | --- |
| [14] | Oracle Bills of Material User's Guide R12.1, Glossary | https://docs.oracle.com/cd/E18727_01/doc.121/e13688/T272930T404170.htm |
| [15] | Oracle Inventory User's Guide R12.2, Glossary | https://docs.oracle.com/cd/E26401_01/doc.122/e48820/T291651T425893.htm |
| [16] | Oracle Work in Process User's Guide R12.1, Glossary | https://docs.oracle.com/cd/E18727_01/doc.121/e13678/T228107glossary.htm |
| [17] | Oracle Order Management Implementation Manual R12.2, Scheduling | https://docs.oracle.com/cd/E26401_01/doc.122/e48842/T373258T377249.htm |
| [18] | SAP Library, Standard Material Types | https://help.sap.com/saphelp_46c/helpdata/en/ff/515afd49d811d182b80000e829fbfe/content.htm |
| [19] | SAP Glossary, factory calendar | https://help.sap.com/saphelp_46c/helpdata/en/34/55c5eb98482bc0e10000009b38f91f/content.htm |
| [20] | SAP Glossary, sales order | https://help.sap.com/saphelp_46c/helpdata/en/35/26c72dafab52b9e10000009b38f974/content.htm |
| [21] | SAP Glossary, outbound delivery | https://help.sap.com/doc/saphelp_470/4.7/en-US/35/2a9250c1035cd5e10000009b38f974/content.htm |
| [22] | SAP 문서, Confirmations in Process Orders | https://help.sap.com/doc/bd8bbf53f106b44ce10000000a174cb4/3.6/en-US/2887bf53f106b44ce10000000a174cb4.html |
| [23] | SAP Library, Preventive Maintenance | https://help.sap.com/saphelp_46c/helpdata/en/8a/1a21554e4211d182be0000e829fbfe/content.htm |
| [24] | SAP Glossary, goods receipt | https://help.sap.com/saphelp_46c/helpdata/en/34/55c5bc98482bc0e10000009b38f91f/content.htm |
| [25] | SAP Glossary, goods movement | https://help.sap.com/saphelp_tm80/helpdata/en/35/26c107afab52b9e10000009b38f974/content.htm |
| [26] | SAP Library, Reorder Point Planning | https://help.sap.com/saphelp_46c/helpdata/en/f4/7d256344af11d182b40000e829fbfe/content.htm |
| [27] | SAP Glossary, manufacturing order | https://help.sap.com/saphelp_46c/helpdata/EN/35/26c3d7afab52b9e10000009b38f974/content.htm |
| [28] | SAP Help, 납품 일정(Delivery Schedules) | https://help.sap.com/saphelp_470/helpdata/en/1f/a6ecd2b41d11d188e80000e8216438/content.htm |
| [29] | SAP Glossary, backflush | https://help.sap.com/saphelp_ewm70/helpdata/en/35/26bfe4afab52b9e10000009b38f974/content.htm |
| [30] | SAP Help, MRP의 순소요량 계산과 가용 재고 | https://help.sap.com/saphelp_46c/helpdata/en/f4/7d27b744af11d182b40000e829fbfe/content.htm |
| [31] | SAP MII(OEE) 도움말. 정지마다 사유를 붙임. 요약만 읽음 | https://help.sap.com/saphelp_mii150sp04/helpdata/EN/8e/936a54dc4b054ee10000000a423f68/content.htm |

### 지표와 현장 용어

| 번호 | 자료 | 주소 |
| --- | --- | --- |
| [32] | 설비종합효율을 다룬 국내 학술지 논문. 구성 요소의 한국어 이름. 본문을 열지 못함 | https://koreascience.or.kr/article/JAKO201223052005223.pdf |
| [33] | Lean Enterprise Institute, Lean Lexicon, Andon | https://www.lean.org/lexicon-terms/andon/ |
| [34] | Automation World, MESA의 MES 정의를 다룬 기사 | https://www.automationworld.com/products/control/news/13302768/mes-definition-work-continues |
| [35] | Gartner IT Glossary, ERP. 요약만 읽음 | https://www.gartner.com/en/information-technology/glossary/enterprise-resource-planning-erp |
| [36] | ASQ, Root Cause Analysis. 요약만 읽음 | https://www.asq.org/quality-resources/root-cause-analysis |
| [37] | SEMI E10의 설비 상태를 풀어 쓴 미국 특허 6,952,656과 7,069,101. 요약만 읽음 | https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/6952656 |

### 사출성형

| 번호 | 자료 | 주소 |
| --- | --- | --- |
| [38] | Nissei Plastic Industrial(사출기 제조사), Glossary | https://www.nisseiplastic.com/en/company/plastic-story/glossary |
| [39] | Autodesk Moldflow 도움말, Glossary of Terms | https://help.autodesk.com/cloudhelp/2016/ENU/MoldflowComm/files/GUID-11C91FDA-5003-4FCC-94A1-921947F09260.htm |
| [40] | 사출성형 불량을 정리한 기술 블로그 | https://sidohaja.co.kr/%EC%82%AC%EC%B6%9C%EC%84%B1%ED%98%95%EB%B6%88%EB%9F%89/ |
| [41] | 헬로티, 사출성형 불량을 다룬 기사 | https://m.hellot.net/mobile/article.html?no=14405 |
| [42] | Chem-Trend, Silver Streaks and Injection Molding | https://in.chemtrend.com/news/silver-streaks-and-injection-molding/ |
| [43] | 한국생산기술연구원 논문. 불량 이름의 목록. 요약만 읽음 | https://koreascience.kr/article/JAKO200529256810600.pdf |
| [44] | 우진플라임의 미성형 원인을 다룬 기사 | https://kidd.co.kr/news/245205 |
| [45] | Plastics Technology, Why and What You Need to Dry | https://ptonline.com/articles/why-and-what-you-need-to-dry |
| [46] | 수지 온도와 배럴 온도 설정의 차이를 측정한 논문 (PMC9783370) | https://pmc.ncbi.nlm.nih.gov/articles/PMC9783370 |
| [47] | 아주대학교 학위논문. 사출 사이클의 단계 | https://dcoll.ajou.ac.kr/dcollection/srch/srchDetail/000000029628 |
| [48] | Plastics Technology, All About Cushion. 요약만 읽음 | https://www.ptonline.com/columns/all-about-cushion |
| [49] | Autodesk Moldflow 도움말, 패밀리 금형. 국내 패밀리 금형 논문 | https://help.autodesk.com/cloudhelp/2014/ENU/MoldflowComm/files/GUID-61395C4C-66AD-4BD9-BA18-ECCFEEC6497C.htm |
| [50] | Assembly Magazine, 사출성형 용어집. 요약만 읽음 | https://assemblymag.com/articles/85935-molding-for-medical-device-assembly-glossary-of-injection-molding-terms |
| [51] | Fictiv, 사출성형 용어 (제조 서비스 회사의 블로그) | https://fictiv.com/?p=12721 |

### 제품

| 번호 | 자료 | 주소 |
| --- | --- | --- |
| [52] | 현대자동차 부품 목록의 윈드실드 사이드 몰딩 클립. 혼다의 차체 수리 안내 | https://www.hyundaipartsdeal.com/genuine/hyundai-clip-b-w-s-side-mldg~87246-1e000.html |
| [53] | 토요타 부품 목록, Cover, roof rack end | https://autoparts.toyota.com/products/product/cover-roof-rack-end-6343835020 |

### 이 프로젝트

| 번호 | 근거 | 위치 |
| --- | --- | --- |
| [P1] | KAMP 사출성형 데이터셋 2종을 직접 분석한 기록 | `docs/data/data-reference-kamp.md` |
| [P2] | RabbitMQ 4.4.1 컨테이너에서 직접 실행해 확인한 동작 | `ontology/contracts.md` 1절 |
| [P3] | 프로젝트 계획과 설계 결정 | `docs/plan/mini-erp-project.md`, `docs/design/erd-decisions.md` |
| [P4] | 사건과 계측값의 구분 | `ontology/contracts.md` 1절 |

## 다시 확인할 것

- KAMP 가이드북(PDF)을 읽으면 "가스"와 "초기허용불량" 라벨의 정확한 뜻을 알 수 있습니다. 파일은 `dataset/`에 있습니다.
- KS X 9001이나 NCS 학습모듈을 구하면 한국어 현장 용어의 근거가 강해집니다.
- 근거가 "약함"이나 "확인 못 함"인 줄은 더 나은 출처를 찾으면 바꿉니다.
