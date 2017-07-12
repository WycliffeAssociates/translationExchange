/**
 * Created by DennisMarchuk on 7/12/2017.
 */

import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'
import { state, handleChange } from './Take'
var stateVal;

export default class RadioExampleRadioGroup extends Component {
    state = {}
    handleChange = (e, { value }) => this.setState({ value })

    stateVal = {state: this.value};

    render() {
        return (
            <Form>
                <Form.Field>
                    <b>{this.state.value}</b>
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Choose this'
                        name='radioGroup'
                        value='this'
                        checked={stateVal}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Or that'
                        name='radioGroup'
                        value='that'
                        checked={this.state.value === 'that'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </Form>
        )
    }
}