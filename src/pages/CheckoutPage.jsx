import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckboxField, SelectField, TextField } from '../components/FormFields';
import Icon from '../components/Icon';
import { formatPrice } from '../utils/format';

const errorMessages = {
  accountEmail: 'Invalid Email',
  accountPhone: 'Invalid Phone Number',
  shipAddress: 'Invalid Address',
  shipCity: 'Invalid City',
  shipState: 'Invalid State/Province',
  shipZip: 'Invalid Zip/Postal Code',
  billAddress: 'Invalid Address',
  billCity: 'Invalid City',
  billState: 'Invalid State/Province',
  billZip: 'Invalid Zip/Postal Code',
  ccName: 'Invalid Cardholder Name',
  ccNumber: 'Invalid Card Number',
  ccCVV: 'Invalid CVV',
};

function getCheckoutState(pathname, checkoutResult) {
  const state = pathname.split('/')[2] ?? 'init';

  if ((state === 'success' || state === 'error') && checkoutResult) {
    return state;
  }

  return 'init';
}

export default function CheckoutPage({ cart, clearCart, onAnnounce, onSectionChange, total }) {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [hasBillingAddress, setHasBillingAddress] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const checkoutResult = location.state?.checkoutResult ?? null;
  const state = getCheckoutState(location.pathname, checkoutResult);
  const hasItems = cart.length > 0;

  useEffect(() => {
    onSectionChange({ title: 'Checkout' });
  }, [location.pathname, onSectionChange]);

  useEffect(() => {
    if (state === 'init') {
      setInvalidFields([]);
      setWaiting(false);
    }
  }, [state]);

  const orderLines = useMemo(
    () =>
      cart.map((entry) => ({
        id: `${entry.item.name}-${entry.size}`,
        label: entry.item.title,
        total: formatPrice(entry.quantity * entry.item.price),
      })),
    [cart],
  );

  const validateForm = () => {
    const form = formRef.current;

    if (!form) {
      return false;
    }

    const elements = Array.from(form.elements).filter(
      (element) =>
        typeof element.checkValidity === 'function' &&
        element.type !== 'button' &&
        !element.disabled,
    );

    const invalidIds = [];
    let firstInvalid = null;

    elements.forEach((element) => {
      if (element.checkValidity()) {
        element.removeAttribute('aria-invalid');
      } else {
        element.setAttribute('aria-invalid', 'true');
        invalidIds.push(element.id);
        firstInvalid ||= element;
      }
    });

    setInvalidFields(invalidIds);

    if (!firstInvalid) {
      return true;
    }

    onAnnounce(errorMessages[firstInvalid.id] ?? 'Please review the form');
    firstInvalid.focus();
    firstInvalid.scrollIntoView({ block: 'center', behavior: 'smooth' });
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setWaiting(true);

    window.setTimeout(() => {
      clearCart();
      navigate('/checkout/success', {
        state: {
          checkoutResult: {
            successMessage: 'Demo checkout process complete.',
          },
        },
      });
      setWaiting(false);
    }, 1000);
  };

  if (state === 'success') {
    return (
      <section className="checkout-page main-frame">
        <header className="checkout-result">
          <h1>Thank you</h1>
          <p>{checkoutResult.successMessage}</p>
          <Link className="shop-button-link responsive-button" to="/">
            Finish
          </Link>
        </header>
      </section>
    );
  }

  if (state === 'error') {
    return (
      <section className="checkout-page main-frame">
        <header className="checkout-result">
          <h1>We couldn&apos;t process your order</h1>
          <p>{checkoutResult.errorMessage}</p>
          <Link className="shop-button-link responsive-button" to="/checkout">
            Try again
          </Link>
        </header>
      </section>
    );
  }

  return (
    <section className={`checkout-page main-frame ${waiting ? 'is-waiting' : ''}`}>
      {!hasItems ? (
        <div className="subsection">
          <p className="empty-cart">
            Your <Icon className="inline-icon" name="cart" /> is empty.
          </p>
        </div>
      ) : (
        <>
          <header className="subsection section-header">
            <h1>Checkout</h1>
            <span>Shop is a demo app - form data will not be sent</span>
          </header>

          <form className="checkout-grid subsection" noValidate onSubmit={handleSubmit} ref={formRef}>
            <section>
              <h2 id="accountInfoHeading">Account Information</h2>
              <TextField
                aria-invalid={invalidFields.includes('accountEmail')}
                autoComplete="email"
                autoFocus
                error={errorMessages.accountEmail}
                id="accountEmail"
                label="Email"
                required
                type="email"
              />
              <TextField
                aria-invalid={invalidFields.includes('accountPhone')}
                autoComplete="tel"
                error={errorMessages.accountPhone}
                id="accountPhone"
                label="Phone Number"
                pattern="\\d{10,}"
                required
                type="tel"
              />

              <h2 id="shipAddressHeading">Shipping Address</h2>
              <TextField
                aria-invalid={invalidFields.includes('shipAddress')}
                error={errorMessages.shipAddress}
                id="shipAddress"
                label="Address"
                pattern=".{5,}"
                required
                type="text"
              />
              <TextField
                aria-invalid={invalidFields.includes('shipCity')}
                error={errorMessages.shipCity}
                id="shipCity"
                label="City"
                pattern=".{2,}"
                required
                type="text"
              />
              <div className="input-row two-column">
                <TextField
                  aria-invalid={invalidFields.includes('shipState')}
                  error={errorMessages.shipState}
                  id="shipState"
                  label="State/Province"
                  pattern=".{2,}"
                  required
                  type="text"
                />
                <TextField
                  aria-invalid={invalidFields.includes('shipZip')}
                  error={errorMessages.shipZip}
                  id="shipZip"
                  label="Zip/Postal Code"
                  pattern=".{4,}"
                  required
                  type="text"
                />
              </div>
              <SelectField defaultValue="US" id="shipCountry" label="Country" required>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
              </SelectField>

              <h2 id="billAddressHeading">Billing Address</h2>
              <CheckboxField
                checked={hasBillingAddress}
                id="setBilling"
                label="Use different billing address"
                onChange={(event) => setHasBillingAddress(event.target.checked)}
              />

              {hasBillingAddress ? (
                <div className="billing-fields">
                  <TextField
                    aria-invalid={invalidFields.includes('billAddress')}
                    autoComplete="billing street-address"
                    error={errorMessages.billAddress}
                    id="billAddress"
                    label="Address"
                    pattern=".{5,}"
                    required={hasBillingAddress}
                    type="text"
                  />
                  <TextField
                    aria-invalid={invalidFields.includes('billCity')}
                    autoComplete="billing address-level2"
                    error={errorMessages.billCity}
                    id="billCity"
                    label="City"
                    pattern=".{2,}"
                    required={hasBillingAddress}
                    type="text"
                  />
                  <div className="input-row two-column">
                    <TextField
                      aria-invalid={invalidFields.includes('billState')}
                      autoComplete="billing address-level1"
                      error={errorMessages.billState}
                      id="billState"
                      label="State/Province"
                      pattern=".{2,}"
                      required={hasBillingAddress}
                      type="text"
                    />
                    <TextField
                      aria-invalid={invalidFields.includes('billZip')}
                      autoComplete="billing postal-code"
                      error={errorMessages.billZip}
                      id="billZip"
                      label="Zip/Postal Code"
                      pattern=".{4,}"
                      required={hasBillingAddress}
                      type="text"
                    />
                  </div>
                  <SelectField defaultValue="US" id="billCountry" label="Country" required>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </SelectField>
                </div>
              ) : null}
            </section>

            <section>
              <h2>Payment Method</h2>
              <TextField
                aria-invalid={invalidFields.includes('ccName')}
                autoComplete="cc-name"
                error={errorMessages.ccName}
                id="ccName"
                label="Cardholder Name"
                pattern=".{3,}"
                required
                type="text"
              />
              <TextField
                aria-invalid={invalidFields.includes('ccNumber')}
                autoComplete="cc-number"
                error={errorMessages.ccNumber}
                id="ccNumber"
                label="Card Number"
                pattern="[\\d\\s]{15,}"
                required
                type="tel"
              />
              <div className="input-row checkout-payment-row">
                <SelectField defaultValue="01" id="ccExpMonth" label="Expiry" required>
                  <option value="01">Jan</option>
                  <option value="02">Feb</option>
                  <option value="03">Mar</option>
                  <option value="04">Apr</option>
                  <option value="05">May</option>
                  <option value="06">Jun</option>
                  <option value="07">Jul</option>
                  <option value="08">Aug</option>
                  <option value="09">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </SelectField>
                <SelectField aria-label="Expiry year" defaultValue="2026" id="ccExpYear" required>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </SelectField>
                <TextField
                  aria-invalid={invalidFields.includes('ccCVV')}
                  autoComplete="cc-csc"
                  error={errorMessages.ccCVV}
                  id="ccCVV"
                  label="CVV"
                  pattern="\\d{3,4}"
                  required
                  type="tel"
                />
              </div>

              <h2>Order Summary</h2>
              {orderLines.map((line) => (
                <div className="checkout-summary-row" key={line.id}>
                  <div className="checkout-summary-flex">{line.label}</div>
                  <div>{line.total}</div>
                </div>
              ))}
              <div className="checkout-total-row">
                <div className="checkout-summary-flex">Total</div>
                <div>{formatPrice(total)}</div>
              </div>

              <button className="shop-button-link responsive-button" type="submit">
                Place Order
              </button>
            </section>
          </form>
        </>
      )}

      {waiting ? <div className="checkout-spinner" aria-label="Submitting order" /> : null}
    </section>
  );
}
