/**
 * Created by DennisMarchuk on 7/12/2017.
 */
import React from 'react';
const {PropTypes} = React;

const RadioButton = React.createClass({
    render: function() {
        const {name, value, checked, label} = this.props;

        return (
            <label>
                <input
                    type='radio'
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={this.handleChange}
                />
                {label}
            </label>
        );
    },

    handleChange: function() {
        const {value, onChange} = this.props;
        onChange(value);
    }
});

const RadioButtonGroup = React.createClass({
    propTypes: {
        name: PropTypes.string,
        checkedValue: PropTypes.string,
        choices: PropTypes.array,
        onChange: PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            checkedValue: ''
        };
    },

    render: function() {
        const {choices, checkedValue, onChange} = this.props;

        const choiceItems = choices.map(choice => {
            const {value, label} = choice;
            const checked = value === checkedValue;

            return (
                <RadioButton
                    key={`radio-button-${value}`}
                    label={label}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                />
            );
        });

        return (
            <div>
                {choiceItems}
            </div>
        );
    }
});



const HelloWorldComponent = React.createClass({
    getInitialState: function() {
        return {
            checkedValue: ''
        };
    },

    render: function() {
        const {name} = this.props;
        const {checkedValue} = this.state;
        const choices = [
            {value: 'bar', label: 'Bar'},
            {value: 'baz', label: 'Baz'}
        ];

        return (
            <div>
                <h1>Hello {name}</h1>
                <RadioButtonGroup
                    name='foo'
                    checkedValue={checkedValue}
                    choices={choices}
                    onChange={this.handleChange}
                />
            </div>
        );
    },

    handleChange: function(value) {
        this.setState({
            checkedValue: value
        });
    }
});

