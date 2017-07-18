/**
 * Created by DennisMarchuk on 7/12/2017.
 */
import React from 'react';
import {Button} from "semantic-ui-react";
import { Icon } from 'semantic-ui-react'


class Delete extends React.Component{
    render(){
        return(
            <Button icon color="red">
                <Icon name='trash' size="large"/>
            </Button>
        )
    }
}

export default Delete