import React from 'react';
import { Card } from 'semantic-ui-react'

const Tables = tableObject => {
    return (
        <div className="Tables">
            <Card>
                <Card.Content >
                    <Card.Header>{tableObject.firstname} {tableObject.lastname}</Card.Header>
                    <Card.Meta>{tableObject.pseudo}</Card.Meta>
                    <Card.Description>{tableObject.email}</Card.Description>
                </Card.Content>
            </Card>
        </div>
    );
};

export default Tables;