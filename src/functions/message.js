const { app, output, trigger } = require('@azure/functions');

const wpsMsg = output.generic({
    type: 'webPubSub',
    name: 'actions',
    hub: 'simplechat',
    connection: 'WebPubSubConnectionString'
});

const wpsTrigger = trigger.generic({
    type: 'webPubSubTrigger',
    name: 'request',
    hub: 'simplechat',
    eventName: 'message',
    eventType: 'user',
    connection: 'WebPubSubConnectionString'
});

app.generic('message', {
    trigger: wpsTrigger,
    extraOutputs: [wpsMsg],
    handler: async (request, context) => {
        context.extraOutputs.set(wpsMsg, [{
            actionName: "sendToUser",
            //data: `[${context.triggerMetadata.connectionContext.userId}] ${request.data}`,
            data: `${request.data}`,
            dataType: request.dataType,
            userId: `${context.triggerMetadata.connectionContext.userId}`
        }]);
    }
});