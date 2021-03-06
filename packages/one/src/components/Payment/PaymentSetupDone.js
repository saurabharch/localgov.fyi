import React from 'react';
import { connect } from "react-redux";
import styles from "../spectre.min.module.css"
import iconStyles from '../typicons.min.module.css';
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";
import { navigate } from 'gatsby-link';


const HeroIl = () => (
    <StaticQuery
        query={graphql`query heroIl5Query {
  heroIl: 
  allFile(
            filter: { relativePath: { eq: "STEP3.png" } }
          ) {
            edges {
              node {
                name
                childImageSharp {
                  fluid {
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                  }
                }
              }
            }
          }

}`}
        render={data => {
            return (<Img
                title={`papergov`}
                alt={`illustration of papergov`}
                style={{ width: '300px', height: '180px' }}
                fluid={data.heroIl.edges[0].node.childImageSharp.fluid} />)
        }} />
)


class FinalConf extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let msg= "Your payment setup is completed!"
        if (this.props.isFirstTime){
            msg = `You did it, ${this.props.name}!`
        }

        return (
          <div className={styles.columns}>
            <div
              className={`${styles.column}  ${styles.textCenter} ${styles.col12}`}
            >
              <div className={styles.empty} style={{ background: "#fcfdfe" }}>
                <h3 className={`${styles.emptyTitle} ${styles.h3}`}> {msg} </h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "1.5rem"
                  }}
                >
                  <HeroIl />
                </div>
                <p style={{ paddingBottom: "4px" }}>
                  {" "}
                  We will take it from here. Our team will reach out to you if
                  there is any info needed
                </p>

                <div className={styles.emptyAction}>
                  <button
                    onClick={() => this.props.finishOnboarding()}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                  >
                    Go to dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
}




const mapStateToProps = function (state, ownProps) {
    return {
        name: state.oneUser.details.displayName,
        isFirstTime: state.oneUser.details.isFirstTime,
    };
};

export default connect(mapStateToProps)(FinalConf);