# 구현 상태

문서에는 앞으로 만들 것까지 적혀 있습니다. 이 쪽은 그중 **지금 코드에 실제로 있는 것**을 보여 줍니다. 사람이 적은 것이 아니라, 사이트를 내보낼 때마다 온톨로지와 코드를 대조해 만듭니다.

## 계층별

| 계층 | 만들어진 것 | 온톨로지에 적힌 것 | 어떻게 확인하나 |
| --- | --- | --- | --- |
| DB 테이블 | 28 | 28 | 스키마 파일의 `CREATE TABLE` |
| API | 3 | 17 | core를 띄우면 springdoc이 내놓는 API 목록. 테스트가 `core/api-paths.txt`와 맞춰 둡니다 |
| 에이전트의 도구 | - | 15 | 아직 확인하지 않음. 이 계층의 첫 코드가 생길 때 넣습니다 |
| 설비 메시지 | - | 7 | 아직 확인하지 않음. 이 계층의 첫 코드가 생길 때 넣습니다 |
| 화면 이벤트 | - | 8 | 아직 확인하지 않음. 이 계층의 첫 코드가 생길 때 넣습니다 |

스키마에는 있는데 온톨로지에 없는 테이블이나, 코드에는 있는데 온톨로지에 없는 API가 생기면 사이트를 내보내는 일이 멈춥니다.

## 만들어진 API

| API | 객체 |
| --- | --- |
| `GET /api/sales-orders` | 수주 |
| `GET /api/sales-orders/{orderNo}` | 수주 |
| `POST /api/sales-orders` | 수주 |

## 객체별 테이블

| 객체 | 묶음 | 상태 | 만들어진 테이블 | 아직 없는 테이블 |
| --- | --- | --- | --- | --- |
| 품목 | 기준정보 | 만들어짐 | `item`, `bom`, `item_replenishment` |  |
| 라인 | 기준정보 | 만들어짐 | `line` |  |
| 설비 | 기준정보 | 만들어짐 | `equipment` |  |
| 금형 | 기준정보 | 만들어짐 | `mold`, `mold_equipment` |  |
| 작업 달력 | 기준정보 | 만들어짐 | `shift`, `work_calendar` |  |
| 고객 | 기준정보 | 만들어짐 | `customer` |  |
| 공급사 | 기준정보 | 만들어짐 | `supplier` |  |
| 수주 | 영업과 계획 | 만들어짐 | `sales_order`, `sales_order_line` |  |
| 예약 | 영업과 계획 | 만들어짐 | `stock_reservation` |  |
| 생산오더 | 영업과 계획 | 만들어짐 | `production_order` |  |
| 작업지시 | 영업과 계획 | 만들어짐 | `work_order` |  |
| 설비 상태 | 생산 실행 | 만들어짐 | `equipment_status_log` |  |
| 사이클 | 생산 실행 | 만들어짐 | `cycle_log` |  |
| 계측값 | 생산 실행 | 만들어짐 | `equipment_telemetry_1m` |  |
| 불량 기록 | 생산 실행 | 만들어짐 | `defect_record`, `defect_type` |  |
| 생산실적 | 생산 실행 | 만들어짐 | `production_result` |  |
| 자재 주문 | 자재와 재고 | 만들어짐 | `purchase_order` |  |
| 자재 LOT | 자재와 재고 | 만들어짐 | `material_lot` |  |
| 자재 투입 | 자재와 재고 | 만들어짐 | `material_charge` |  |
| 재고 | 자재와 재고 | 만들어짐 | `stock_balance`, `stock_movement` |  |
| 출하 | 자재와 재고 | 만들어짐 | `shipment` |  |
| 변경안 | 아직 ERD 에 없는 것 | 예정 |  |  |
| 문서 | 아직 ERD 에 없는 것 | 예정 |  |  |
| 사건 | 아직 ERD 에 없는 것 | 예정 |  |  |
