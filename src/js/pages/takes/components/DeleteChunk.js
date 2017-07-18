/**
 * Created by DennisMarchuk on 7/12/2017.
 */
import React from 'react';
import {Button} from "semantic-ui-react";
import { Icon } from 'semantic-ui-react'
import config from 'config/config';
import axios from 'axios'
import Take from "./Take";



class DeleteChunk extends React.Component{

        render()
        {
            return (
                <Button icon color="red" onClick={this.deleteTake}>
                    <Icon name='trash' size="large"/>
                </Button>
            )
        }
    deleteTake(){
        axios.delete(config.apiUrl + 'takes/' + this.props.takeId + '/')
    }
}



export default DeleteChunk

//this.props.take.take.id