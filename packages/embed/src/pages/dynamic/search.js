import React from "react";
import { connect } from "react-redux";

import Search from "../../components/Search";

import styles from "../../components/spectre.min.module.css";

class SearchIndex extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div className={`${styles.container} ${styles.gridXl}`}>
        <div
          className={styles.columns}
          style={{
            background: "#fff",
            margin: "0.6rem",
            border: "1px solid rgba(86, 39, 255, .2)",
            boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
          }}
        >
          <div className={`${styles.column} ${styles.col12}`}>
            <div
              className={styles.panel}
              style={{
                border: "none",
                borderRadius: "0.3rem"
              }}
            >
              <div
                style={{
                  margin: "1.3rem 0 0 0"
                }}
                className={styles.panelBody}
              >
                <Search location={this.props.location} />
              </div>

              <div
                className={styles.panelFooter}
                style={{
                  borderTop: "1px solid rgba(48,55,66,.10)",
                  margin: "1.5rem 0 0.6rem 0",
                  padding: "0.4rem 0 0 0",
                  display: "flex",
                  justifyContent: "right"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "180px"
                  }}
                >
                  <div className={styles.textGray}> powered by</div>
                  <a href="https://papergov.com" target="_blank">
                    <h6>papergov</h6>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchIndex;
