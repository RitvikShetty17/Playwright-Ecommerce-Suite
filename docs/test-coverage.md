# Test Coverage — Traceability Matrix

Maps business requirements to automated test cases in the Playwright E2E suite.

---

## Legend
| Symbol | Meaning |
|--------|---------|
| ✅ | Covered by automated test |
| 🔵 | Smoke test — runs on every push |
| 🟡 | Sanity test — runs after bug fixes |
| 🟢 | Regression test — runs nightly |

---

## Authentication Module

| Req ID | Business Requirement | Test File | Test Name | Tag |
|--------|---------------------|-----------|-----------|-----|
| AUTH-01 | User can log in with valid credentials | login.spec.ts | valid login navigates to products page | 🔵 Smoke |
| AUTH-02 | Invalid credentials show error message | login.spec.ts | invalid login shows error message | 🟡 Sanity |
| AUTH-03 | Empty credentials show error message | login.spec.ts | empty credentials shows error message | 🟡 Sanity |

---

## Products Module

| Req ID | Business Requirement | Test File | Test Name | Tag |
|--------|---------------------|-----------|-----------|-----|
| PROD-01 | Products page displays all available items | products.spec.ts | products page loads with 6 items | 🔵 Smoke |
| PROD-02 | User can add a product to cart | products.spec.ts | adding item to cart updates cart badge | 🟢 Regression |

---

## Cart Module

| Req ID | Business Requirement | Test File | Test Name | Tag |
|--------|---------------------|-----------|-----------|-----|
| CART-01 | Added item appears in cart | cart.spec.ts | added item appears in cart | 🔵 Smoke |
| CART-02 | Multiple items can be added to cart | cart.spec.ts | multiple items appear in cart | 🟢 Regression |
| CART-03 | User can remove item from cart | cart.spec.ts | removing item from cart updates cart | 🟢 Regression |

---

## Checkout Module

| Req ID | Business Requirement | Test File | Test Name | Tag |
|--------|---------------------|-----------|-----------|-----|
| CHK-01 | User can complete full purchase end-to-end | checkout.spec.ts | complete checkout flow succeeds | 🔵 Smoke |
| CHK-02 | Checkout requires valid shipping information | checkout.spec.ts | checkout with empty shipping info shows error | 🟡 Sanity |

---

## Coverage Summary

| Module | Total Requirements | Automated | Coverage |
|--------|-------------------|-----------|----------|
| Authentication | 3 | 3 | 100% |
| Products | 2 | 2 | 100% |
| Cart | 3 | 3 | 100% |
| Checkout | 2 | 2 | 100% |
| **Total** | **10** | **10** | **100%** |

---

## Browser Coverage

All test cases run across three browsers in CI:
- ✅ Chromium (Desktop Chrome)
- ✅ Firefox (Desktop Firefox)
- ✅ WebKit (Desktop Safari)