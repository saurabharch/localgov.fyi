import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import PlaidLink from "react-plaid-link";
import PaymentSetupDone from "./PaymentSetupDone";
import PaymentPlans from "./PaymentPlans";
import CardPaymentMethod from './CardPaymentMethod';
import { toggleStripeModal } from "./actions";
import { StripeProvider } from "react-stripe-elements";
const windowGlobal = typeof window !== "undefined" && window;


const PaymentPlan = props => (
  <div className={`${styles.column} ${styles.colSm3} ${styles.colXs12}`}>
    <div
      className={styles.card}
      style={{
        border: `${props.focus ? "1px solid rgba(86, 39, 255, .6)" : "0"}`,
        background: `${props.focus ? "#fff" : "#fbfcfe"}`,
        borderRadius: "0.2rem",
        boxShadow: "0 .25rem 1rem rgba(48,55,66,.15)"
      }}
    >
      <div className={styles.cardHeader}>
        {props.tag ? (
          <span
            className={`${styles.label} ${styles.labelRounded} ${styles.labelSecondary} ${styles.floatRight}`}
          >
            {props.tag}
          </span>
        ) : null}
        <div className={styles.h3}>
          {" "}
          <small>$</small>
          {props.price}
        </div>
        <div className={`${styles.cardSubitle} ${styles.textGray}`}>
          <span
            className={`${iconStyles.typcn} ${iconStyles.typcnCalendar}`}
          ></span>
          {props.duration}
        </div>
      </div>
      <div className={styles.cardBody} />
      <div className={styles.cardFooter}>
        <button
          onClick={() => props.selectPaymentPlan(props.id)}
          className={`${styles.btn} ${
            props.focus ? `${styles.btnPrimary}` : `${styles.btnSecondary}`
          }`}
        >
          Select this plan
        </button>
      </div>
    </div>
  </div>
);

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: null,
      stripe: null,
      stripeCardModalOpen: false
    };
    this.selectPaymentPlan = this.selectPaymentPlan.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
    this.handleOnExit = this.handleOnExit.bind(this);
    this.toggleCardDetails = this.toggleCardDetails.bind(this);
    this.onCardPaymentSubmit = this.onCardPaymentSubmit.bind(this);
  }

  toggleCardDetails(toggle) {
    this.setState({
      stripeCardModalOpen: toggle
    });
  }

  onCardPaymentSubmit(stripe_token) {
    this.props.setupCardPayment(stripe_token, this.state.selectedPlan);
  }

  componentDidMount() {
    if (windowGlobal) {
      if (window.Stripe) {
        this.setState({ stripe: window.Stripe(process.env.GATSBY_STRIPE_KEY) });
      } else {
        document.querySelector("#stripe-js").addEventListener("load", () => {
          // Create Stripe instance once Stripe.js loads
          this.setState({
            stripe: window.Stripe(process.env.GATSBY_STRIPE_KEY)
          });
        });
      }
    }
    const  {landingPlan } = this.props;
    console.log(landingPlan, "componentdidmount")
    if (landingPlan){
      this.setState({
        selectedPlan: landingPlan
      })
    }
  }

  selectPaymentPlan(plan) {
    this.setState({
      selectedPlan: plan
    });
  }

  handleOnSuccess(public_token, metadata) {
   
    this.props.submitBankPayment(
      public_token,
      metadata.account_id,
      this.state.selectedPlan
    );
  }

  handleOnExit(err, metadata) {
    // handle the case when your user exits Link
    console.log(err, metadata);
  }

  render() {
    if (this.props.paymentSetupInProgress) {
      return <div className={styles.loading} />;
    }

    if (this.props.paymentSetupDone) {
      return <PaymentSetupDone />;
    }

    const { selectedPlan, stripeCardModalOpen } = this.state;

    console.log(this.state, "payment")
    return (
      <Fragment>
        <StripeProvider stripe={this.state.stripe}>
          <CardPaymentMethod
            email={this.props.email}
            stripeCardModalOpen={stripeCardModalOpen}
            onClose={this.toggleCardDetails}
            onStripeToken={this.onCardPaymentSubmit}
          />
        </StripeProvider>

        <div className={styles.columns} style={{ margin: "1rem 0" }}>
          <div className={`${styles.column} ${styles.col1}`} />
          <div className={`${styles.column} ${styles.col10}`}>
            <div className={styles.columns}>
              <PaymentPlans
                userTypeSelected={true}
                selectedPlan={this.state.selectedPlan}
                isBusiness={this.props.isBusiness}
                onSelectPlan={this.selectPaymentPlan}
              />
            </div>
          </div>
          <div className={`${styles.column} ${styles.col1}`} />
        </div>
        {selectedPlan ? (
          <div className={styles.columns} style={{ margin: "3rem 0" }}>
            <div className={`${styles.column} ${styles.col1}`} />
            <div className={`${styles.column} ${styles.col10}`}>
              <div className={styles.columns}>
                <div
                  className={`${styles.column} ${styles.colSm5} ${styles.hideXs}`}
                />
                <div
                  className={`${styles.column} ${styles.colSm2} ${styles.colXs12}`}
                  style={{
                    margin: "1rem 0",
                    display: "flex",

                    flexWrap: "wrap"
                  }}
                >
                  <div style={{ color: "#fff", width: "300px" }}>
                    <button
                      className={`${styles.btn}  ${styles.btnPrimary}`}
                      style={{
                        background: "rgb(86, 39, 255)",
                        color: "#fff",
                        width: "100%"
                      }}
                      onClick={this.toggleCardDetails}
                    >
                      <span
                        className={`${iconStyles.typcn} ${iconStyles.typcnLockClosed}`}
                      ></span>{" "}
                      Finish payment with credit card
                    </button>
                  </div>
                  <div
                    style={{ width: "300px" }}
                    className={`${styles.divider} ${styles.textCenter}`}
                    data-content="OR"
                  ></div>
                  <PlaidLink
                    clientName="Evergov One"
                    env={process.env.GATSBY_PLAID_ENV}
                    className={`${styles.btn}  ${styles.btnPrimary}`}
                    style={{
                      background: "rgb(86, 39, 255)",
                      color: "#fff",
                      width: "300px"
                    }}
                    selectAccount={true}
                    product={["auth"]}
                    publicKey={process.env.GATSBY_PLAID_PUBLIC_KEY}
                    onExit={this.handleOnExit}
                    onSuccess={this.handleOnSuccess}
                  >
                    <span
                      className={`${iconStyles.typcn} ${iconStyles.typcnLockClosed}`}
                    ></span>{" "}
                    Connect your bank account
                  </PlaidLink>
                </div>

                <div
                  className={`${styles.column} ${styles.colSm5} ${styles.hideXs}`}
                />
              </div>
            </div>
            <div className={`${styles.column} ${styles.col1}`} />
          </div>
        ) : null}
      </Fragment>
    );
  }
}


export default Payment;
