return new Promise(async resolve => {
    // let msg = app.data.message;
    // function A() {
    // }
    // if (msg === "ivr") {
    //     A();
    // }

    app.log(app.profile.name, "== app.profile.name ==");

    app.log(app.sender.toString(), "== 0    MY MOBILE NUMBER==");//.substring()

    app.log(app.data, "== APP.DATA MAIN==");

    let source = app.source;


    if (source === "whatsapp" && (app.data.image || app.data.file || app.data.voice || app.data.video || app.data.location)) {
        app.sendTextMessage(`Currently, this format is not supported, please respond in text.`).then(() => {
            return Promise.reject();
        });
    }

    //app.sender = "";


    //app.log('== Inside MAIN TOP ==');

    if (app.BOT_ENV === "sandbox") {
        app.audienceId = '60f7ff96f393a3e53317f375';
        app.whatsAppAudienceId = "61126a61dac09178deb4b9e0";
    } else if (app.BOT_ENV === "staging") {
        app.audienceId = '61011074a0da2ddbe016b496';
        app.whatsAppAudienceId = '611273fadac0912997b56d68';
    } else if (app.BOT_ENV === "production") {
        app.audienceId = '616559cb9612c16657b091bc';
        app.whatsAppAudienceId = "60fab66f6dfe71538b0a8e17";
    }
    app.CONTINUE = {
        pitch: 2,
        ignorei18n: true,
        text_type: "ssml",
        tts_engine: 'microsoft',
        stt_engine: "microsoft",
        options: {
            recording_max_duration: 6,
            recording_silence_duration: 6
        }
    }

    app.DISCONNECT = {
        ignorei18n: true,
        text_type: "ssml",
        tts_engine: 'microsoft',
        stt_engine: "microsoft",
        options: {
            recording_max_duration: 6,
            recording_silence_duration: 6
        },
        disconnect: true
    }
    
    async function verifyUserInput() {
        try { let apiNotifications = await app.memory.get('apiNotifications'); app.log(apiNotifications,'===APINOTIFICATIONS==')
         return Promise.resolve() }
        catch (e) {
            app.memory.set('count', '1');
            return Promise.resolve();
        }
        if (source == 'voice' && (!app.data.message || !app.data.message.trim()) && !app.data.event) {
            // get the count
            let count = "0";
            try {
                count = await app.memory.get('count');
            } catch (e) { app.log(e, "== Error while Getting memory in Main memory No reponse handling count =="); }

            // get location memory for initial step silent 
            let location = "";
            try {
                location = await app.memory.get('location');
            } catch (e) { app.log(e, "== Error while Getting memory in Main memory No reponse handling location =="); }

            if (location === "greetPrompt" && parseInt(count) > 0) {
                try {
                    await app.memory.delete('location');
                } catch (e) { app.log(e, "== error deleting location in main at the beginning =="); }

                return app.triggerIntent('neutral-reasons-flow').then(() => {
                    return Promise.resolve();
                });
            } else {
                if (parseInt(count) == 0) {
                    return app.sendTextMessage(app.renderMessage('blankMessageResponse', {}, `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-IN"><voice name="Microsoft Server Speech Text to Speech Voice (en-IN, NeerjaNeural)"> Can you <prosody rate="-10.00%">please respond? </prosody></voice></speak>`), app.CONTINUE).then(() => {
                        app.memory.set('count', '1');
                        return Promise.reject();
                    });
                } else {
                    if (parseInt(count) <= 2) {
                        return app.sendTextMessage(app.renderMessage('blankMessageResponse', {}, `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-IN"><voice name="Microsoft Server Speech Text to Speech Voice (en-IN, NeerjaNeural)"> Can you <prosody rate="-10.00%">please respond? </prosody></voice></speak>`), app.CONTINUE).then(() => {
                            app.memory.set('count', parseInt(count) + 1)
                            return Promise.reject();
                        });
                    }
                    else {
                        app.memory.set('userResponse', 'No Response');
                        return app.sendTextMessage(app.renderMessage('invalidInputCallendResponse', {}, `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-IN"><voice name="Microsoft Server Speech Text to Speech Voice (en-IN, NeerjaNeural)"> Sorry, <break time="50ms" /> I was not able to get a<prosody contour="(49%, +46%)"> response</prosody><prosody rate="-10.00%"> from you.</prosody> Thanks for <prosody rate="-10.00%">connecting</prosody>. Have a<prosody contour="(50%, +51%)"> nice day. </prosody></voice></speak>`), { disconnect: true }).then(() => {
                            return Promise.reject();
                        });
                    }
                }
            }
        }
        else {
            try { await app.memory.delete('count') } catch (err) { app.log(err, "=== NO COUNT PRESENT IN MEMORY FOR BLANK MESSAGE ==="); }
            return Promise.resolve();
        }
    }
    app.setOptions({
        minConfidence: 0.98,
        translateAPI: 'microsoft',
        secondaryModelConfidence: 0.8,
        contextConfidence: 0.8,
        translateInputMessages: false,
        enableDidYouMean: false,
        enableSimilaritySearchResultLogs: true,
        excludeParamsForSwitching: ['greeting', 'newgreeting', 'getreason', 'covidrecoverystep', 'covidrecoveryaskpaymentdate', 'neutralreasonstep', 'askpaymentdate', 'financialreasonsstep', 'helperivrnotifi', 'handler','askreason',// -> ivr flow steps
            'usergreeting', 'paymentremainder', 'payment-reminder-main-recovery', 'paylater', 'knowoutstandingdetails', 'sendpaymentinfo', 'sendinfo'], // -> WA flow steps
        targetLanguage: "en",
        i18n: true,
        text_type: "ssml",
        voiceOptions: {
            capture_dtmf: false,
            tts_engine: 'microsoft',
            stt_engine: "microsoft",
            stt_mode: "streaming",
            language: "en-In",
            text_type: "ssml",
            recording_max_duration: 6,
            recording_silence_duration: 6,
            recording_beep: false,
            disconnect: false,
            boost_phrases: [],
        },
        invalidCount: 2,
        initialize: () => {
            return verifyUserInput()
        },
        onInvalidCountExceeded: () => {
            if (source == 'voice') {
                app.sendTextMessage(app.renderMessage('invalidInputCallendResponse', {}, `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-IN"><voice name="Microsoft Server Speech Text to Speech Voice (en-IN, NeerjaNeural)"> Sorry, <break time="50ms" /> I was not able to get a<prosody contour="(49%, +46%)"> response</prosody><prosody rate="-10.00%"> from you.</prosody> Thanks for <prosody rate="-10.00%">connecting</prosody>. Have a<prosody contour="(50%, +51%)"> nice day. </prosody></voice></speak>`), { 'disconnect': true }).then(() => {
                    return Promise.reject();
                });
            }

        }
    });

    async function startBot() {
        if (app && app.data && !app.data.event) {
            let flag = false;
            if (app.data && app.data.extra_params && app.data.extra_params.campaignId && app.data.extra_params.campaignId === "apiNotifications") {
                app.log("......Inside main apiNotifications if......")
                try { let apiNotifications = await app.memory.get('apiNotifications') }
                catch (e) {
                    app.log("........Inside catch of apiNotifications in app.start.........")
                    app.memory.set('count', '1');
                    app.memory.set('apiNotifications', true)
                    
                    try { app.clearContext(); } catch (e) { app.log(e, "== Error in clear context MAIN =="); }

                    let name = "";
                    let number = "";
                    let botName = "";
                    let companyName = "";
                    let company_id = "";
                    let customer_id = "";
                    let date_of_default = "";
                    let transaction_id = "";
                    let loan_merchant_name = "";
                    let due_amounts = "";
                    let delay_reason = "";
                    let health_call_attempts = "";
                    let payment_step = "";
                    let manual_payment_link = "";
                    let helpline_number = "";
                    let ptp_commitment_date = "";
                    let ptp_commitment_amnt = "";
                    let lender_name = "";
                    //let tags = [];
                    let flow_start = "";

                    let data = "";

                    app.log(app.data,"== In Main app.data.event.data.extra_params.user ==");

                    // get it from the call log
                    if (app.data && app.data.extra_params && app.data.extra_params.user) {
                        data = app.data.extra_params.user;

                        name = data.name ? data.name : "";
                        botName = data.bot_name ? data.bot_name : "";
                        companyName = data.company_name ? data.company_name : "";
                        company_id = data.company_id ? data.company_id : "";
                        customer_id = data.customer_id ? data.customer_id : "";
                        date_of_default = data.date_of_default ? data.date_of_default : "";
                        transaction_id = data.transaction_id ? data.transaction_id : "";
                        loan_merchant_name = data.loan_merchant_name ? data.loan_merchant_name : "";
                        due_amounts = data.due_amounts ? data.due_amounts : "";
                        delay_reason = data.delay_reason ? data.delay_reason : "";
                        health_call_attempts = data.health_call_attempts ? data.health_call_attempts : "";
                        payment_step = data.payment_step ? data.payment_step : "";
                        manual_payment_link = data.manual_payment_link ? data.manual_payment_link : "";
                        helpline_number = data.helpline_number ? data.helpline_number : "";
                        ptp_commitment_date = data.ptp_commitment_date ? data.ptp_commitment_date : "";
                        ptp_commitment_amnt = data.ptp_commitment_amnt ? data.ptp_commitment_amnt : "";
                        lender_name = data.lender_name ? data.lender_name : "";
                        flow_start = data.flow_start ? data.flow_start : "";
                    }

                    if (data != "") {
                        app.memory.set('userName', name);
                        //app.memory.set('botName', botName);

                        // create IVR user Data memory :
                        let ivrUserData = {
                            name: name,
                            botName: botName,
                            companyName: companyName,
                            company_id: company_id,
                            customer_id: customer_id,
                            date_of_default: date_of_default,
                            transaction_id: transaction_id,
                            loan_merchant_name: loan_merchant_name,
                            due_amounts: due_amounts,
                            delay_reason: delay_reason,
                            health_call_attempts: health_call_attempts,
                            payment_step: payment_step,
                            manual_payment_link: manual_payment_link,
                            helpline_number: helpline_number,
                            ptp_commitment_date: ptp_commitment_date,
                            ptp_commitment_amnt: ptp_commitment_amnt,
                            lender_name: lender_name,
                            flow_start: flow_start.toLocaleLowerCase().trim(),
                            //tags: tags
                        };
                        await app.memory.set('ivrUserData', JSON.stringify(ivrUserData));
                    }

                    app.log("== API NOTIFICATION TRIGGER JOURNEY ==");
                    return app.triggerIntent('voicenotificationapihandler').then(() => {
                        return Promise.resolve();
                    });
                //return Promise.resolve();
                } 
            }
            if(!flag){
                if (app.data.message && app.data.message.toLowerCase().trim() === 'welcome') {
                    app.profile.name = app.sender
                    app.updateProfile();
                    try {
                        await app.memory.delete('count');
                    } catch (e) { app.log(e, "== error deleting count in main==="); }
                    return app.start();
                } else {
                    return app.start();
                }
            }
        }
    }


    if (app.data && app.data.event && app.data.event.code == 'callbackStatus') {

        // getting company id from ivrUserData
        let ivrData = "NoData";
        try {
            ivrData = await app.memory.get('ivrUserData');
            ivrData = JSON.parse(ivrData);
        } catch (e) { app.log(e, "== Error while getting ivrUserData memory in greetingPrompt =="); }

        let company_id = "";

        if (ivrData != "NoData") {
            company_id = ivrData.company_id;
        }

        let calldata = app.data.event.data;
        // 1.) Update call_record_details
        try {
            // Calculate Billing minutes
            let duration = Math.ceil((new Date(calldata.end_time) - new Date(calldata.pick_time)) / 1000);
            let billing_minutes = app.data.event.data.bot_failed == false ? Math.ceil(duration / 60) : 0;

            // update call status Analytics :

            if (calldata.status && calldata.status === "answered") {
                app.analytics.increment("callstatusanalytics", { "type": "Answered" });
            } else if (calldata.status && calldata.status === "not_answered") {
                app.analytics.increment("callstatusanalytics", { "type": "Unanswered" });
                duration = 0;
                billing_minutes = 0;
            } else if (calldata.status && calldata.status === "failed") {
                app.analytics.increment("callstatusanalytics", { "type": "Failed" });
                duration = 0;
                billing_minutes = 0;
            } else {
                app.analytics.increment("callstatusanalytics", { "type": calldata.status });
            }
            //app.log(billing_minutes, "=== BILLING MINUTES MAIN 2===");
            let table = "call_record_details";
            let record = {
                sid: calldata.sid ? calldata.sid : "",
                status: calldata.status ? calldata.status : "",
                phone_no: calldata.phone_no ? calldata.phone_no : "",
                start_time: calldata.start_time ? calldata.start_time : "",
                ringing_time: calldata.ringing_time ? calldata.ringing_time : "0",
                duration: duration,
                caller_id: calldata.caller_id ? calldata.caller_id : "",
                dail_time: calldata.dial_time ? calldata.dial_time : "",
                pick_time: calldata.pick_time ? calldata.pick_time : "0",
                end_time: calldata.end_time ? calldata.end_time : "",
                telco_code: calldata.telco_code ? calldata.telco_code : "",
                telco_text: calldata.telco_text ? calldata.telco_text : "",
                recording_url: calldata.recording_url ? calldata.recording_url : "",
                bot_failed: calldata.bot_failed.toString() ? calldata.bot_failed.toString() : "",
                chaturl: app.getSessionMessageLogUrl() ? app.getSessionMessageLogUrl() : "",
                billing_minutes: billing_minutes,
                call_direction: calldata.direction ? calldata.direction : "",
                company_id: company_id
            }
            try {
                app.datastore.insert({ table, record });
            }
            catch (error) {
                app.log(error, " ==== ERROR while creating call_record_details in Main ====1====");
            }
        } catch (error) {
            app.log(error, " ==== ERROR while creating call_record_details in Main ====2====");
        }
        try {
            await app.memory.delete('userName');
        } catch (e) { app.log(e, "== error deleting userName in main==="); }
        try {
            await app.memory.delete('callbackDate');
        } catch (e) { app.log(e, "== error deleting callbackDate in main==="); }
        try {
            await app.memory.delete('ivrUserData');
        } catch (e) { app.log(e, "== error deleting ivrUserData in main==="); }
        try {
            await app.memory.delete('flowtype');
        } catch (e) { app.log(e, "== error deleting flowtype in main==="); }
        try {
            await app.memory.delete('dueDate'); // check and remove this memory in greetPrompt
        } catch (e) { app.log(e, "== error deleting dueDate in main==="); }
        try {
            await app.memory.delete('invalidCount');
        } catch (e) { app.log(e, "== error deleting invalidCount in main==="); }
        try {
            await app.memory.delete('IntroFlowType');
        } catch (e) { app.log(e, "== error deleting IntroFlowType in main==="); }
        try {
            await app.memory.delete('healthIssueType');
        } catch (e) { app.log(e, "== error deleting healthIssueType in main==="); }
        try {
            await app.memory.delete('neutralReason');
        } catch (e) { app.log(e, "== error deleting neutralReason in main =="); }
        try {
            await app.memory.delete('location');
        } catch (e) { app.log(e, "== error deleting location Memory in main at the End=="); }

        try { await app.memory.delete('apiNotifications'); } 
        catch (e) { app.log(e, "== error deleting apiNotifications memory in main at the End=="); }

        return;
    }
    startBot();
});
