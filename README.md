# Sunbird bot client application
This is build as Angular library. Where this angular library can be integrated into any angular application(like sunbird portal). Once we integrate this library into portal user can interact with bot for his queries by navigating through the options provided by the bot.


# Getting Started

To integrate the chatbot client library into portal use the below steps

## Step 1: Install the package

    npm i sunbird-chatbot-client --save


## Step 2: Import the modules and components
Import the NgModule for each component you want to use:
       
    import {ChatLibModule, ChatLibService} from 'sunbird-chatbot-client';
    
    @NgModule({
	    ...
	    
	    imports: [ChatLibModule],
	    
	    ...
    })


## Step 3: Add the library component to the HTML page

    <lib-chat-window [inputValues]="botConfig"></lib-chat-window>

### botConfig properties:

    chatbotUrl: string  -> API endpoint for server communication to get the response for the user input
    appId: string       -> For Telemetry - Unique application indentifier 
    userId: string      -> For telemetry - User details who is interacting with the bot
    did: string         -> For telemetry - Unique device string for telemetry to log
    channel: string     -> For telemetry - Unique channel string to identify the use belongs to which tenant



## Available components

|Feature| Notes| Selector|
|--|--|--|
| [Chat Window](https://github.com/Sunbird-Ed/SunbirdEd-consumption-ngcomponents) | Chat Window for Chat Bot | lib-chat-window|
| [Chat Message List](https://github.com/Sunbird-Ed/SunbirdEd-consumption-ngcomponents) | Chat Messages Get Listed in Widget | lib-chat-message-list|
| [Chat Message](https://github.com/Sunbird-Ed/SunbirdEd-consumption-ngcomponents) | Library Chat Message Component |lib-chat-message|
| [Chat Message Bottom Bar](https://github.com/Sunbird-Ed/SunbirdEd-consumption-ngcomponents) | Can be used in the course page for all consumption platforms|lib-chat-message-bottom-bar|
