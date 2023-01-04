/*
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import LayersTool from './LayersTool';

class VisibilityCheck extends React.Component {
    static propTypes = {
        node: PropTypes.object,
        tooltip: PropTypes.string,
        propertiesChangeHandler: PropTypes.func,
        style: PropTypes.object,
        checkType: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        glyphChecked: PropTypes.string,
        glyphUnchecked: PropTypes.string
    };

    static defaultProps = {
        style: {},
        checkType: "glyph",
        glyphChecked: "eye-open",
        tooltip: "toc.toggleLayerVisibility",
        glyphUnchecked: "eye-close"
    };

    render() {
        if (this.props.checkType === "glyph") {
            if ( this.props.isInExclusiveGroup ) {
                const exclusiveLayerIconActive = "record"
                const exclusiveLayerIconInactive = "unchecked"
                return (<LayersTool
                    tooltip={this.props.tooltip}
                    style={this.props.style}
                    className={"visibility-check" + (this.props.node.visibility ? " checked" : "")}
                    data-position={this.props.node.storeIndex}
                    glyph={this.props.node.visibility ? exclusiveLayerIconActive : exclusiveLayerIconInactive}
                    onClick={this.changeVisibility}
                />);
            } else {
                return (<LayersTool
                    tooltip={this.props.tooltip}
                    style={this.props.style}
                    className={"visibility-check" + (this.props.node.visibility ? " checked" : "")}
                    data-position={this.props.node.storeIndex}
                    glyph={this.props.node.visibility ? this.props.glyphChecked : this.props.glyphUnchecked}
                    onClick={this.changeVisibility}
                />);
            }
        }
        return (<input className="visibility-check" style={this.props.style}
            data-position={this.props.node.storeIndex}
            type={isFunction(this.props.checkType) ? this.props.checkType(this.props.node) : this.props.checkType}
            checked={this.props.node.visibility ? "checked" : ""}
            onChange={this.changeVisibility} />);
    }

    changeVisibility = () => {
        this.props.propertiesChangeHandler(this.props.node.id, {visibility: !this.props.node.visibility});
    };
}

export default VisibilityCheck;
