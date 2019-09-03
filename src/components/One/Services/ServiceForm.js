import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import FieldComponents from "./FormFields/FieldComponents";
import { createYupSchema } from "./yupSchemaCreator";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";



class ServiceForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.yupSchema = this.yupSchema.bind(this);
  }

  yupSchema() {
    const { selectedService, canSkip } = this.props;
    const yepSchema = selectedService.formSchema.reduce(createYupSchema, {});
    const sch = yup.object().shape(yepSchema);
    return sch;
  }

  submitForm(values ) {
    const { onSubmit, selectedService } = this.props;
    onSubmit(values, selectedService);
  }

  render() {
    const { selectedService, canSkip, uploadedFile } = this.props;
    const { name, icon } = selectedService;
    const { initialFormData, formData } = selectedService;
    let initialValues = formData;
    if (!formData){
        initialValues = initialFormData;
    }

    return (
        <Fragment>

        <div
          className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
        />
        <div
          className={`${styles.column} ${styles.col8} ${styles.colXs12}`}
        >
          <div
            className={styles.card}
            style={{
              border: "1px solid rgba(86, 39, 255, .2)",
              background: "#fff",
              marginBottom:"4rem",
              padding: '0.2rem',
              borderRadius: "0.3rem",
              boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
            }}
          >
            <div className={styles.cardHeader}>
              <h5 className={` ${styles.cardTitle}`}>{name} {this.props.isFinalized ? (<span
                className={`${iconStyles.typcn} ${styles.textSuccess} ${iconStyles.typcnTick}`}
              />) : null} </h5>
              <div className={`${styles.cardBody}`}>
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValues}
                  validationSchema={this.yupSchema()}
                  className={styles.formGroup}
                  onSubmit={values => {
                    // same shape as initial values

                    this.submitForm(values);
                  }}
                  render={(props, actions) => {
                    return (
                      <form
                        className={styles.formHorizontal}
                        onSubmit={props.handleSubmit}
                      >
                        <FieldComponents
                          key={`${name}-field-component`}
                          {...props}
                          formSchema={selectedService.formSchema}
                        />
                        <div className={styles.textRight}>
                          <button
                            disabled={!props.isValid}
                            className={`${styles.btn} ${
                              styles.btnPrimary
                            } ${styles.btnLg}`}
                            type="submit"
                          >
                            {!formData ? 
                            ` Submit `: ` Update`}
                          </button>
                        </div>
                      </form>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.column} ${styles.col2} ${styles.hideXs}`}
        />
                  </Fragment>
    );
  }
}

export default ServiceForm;