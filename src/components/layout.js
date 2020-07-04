import React, {Fragment} from "react"
import PropTypes from "prop-types"
import InfoBox from "./InfoBox";
import Navigator from "./Navigator";

const Layout = ({ children }) => {
    return (
    <Fragment>
        <InfoBox/>
        {children}
        <Navigator/>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
