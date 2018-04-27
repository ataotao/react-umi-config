import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

class SelectComponent extends Component {
    render() {
        const {options, selectConfig, getFieldDecorator, name } = this.props;

        return (
            getFieldDecorator(name, {initialValue: options[0].val})(
                <Select {...selectConfig}>
                    {
                        options.map(item => <Option key={item.key} value={item.val}>{item.key}</Option>)
                    }
                </Select>
            )
        );
    }
}

export default SelectComponent;
