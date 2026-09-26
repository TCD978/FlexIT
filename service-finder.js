/* Service rules refer to canonical pricing rows in index.html, never copied prices. */
(function () {
    'use strict';
    const TOPICS = Object.freeze({
        wifi:{label:'Wi-Fi & networking', hint:'Connections, coverage & working from home', question:'What needs attention?', choices:{home:[['wifi','One router / up to 5 devices'],['mesh','Mesh coverage / up to 3 nodes'],['troubleshoot','Something is not working']],business:[['office-network','Office network / up to 5 devices'],['remote-business','Help with an existing connection']]}},
        computer:{label:'Computers & devices',hint:'Setup, accounts & everyday troubleshooting',question:'What would help most?',choices:{home:[['computer','Set up a computer'],['troubleshoot','Fix a computer or software issue'],['coaching','Learn how to use my technology']],business:[['workstation','Set up a workstation'],['workspace','Microsoft 365 / Google Workspace sign-in'],['remote-business','Troubleshoot an existing setup']]}},
        smart:{label:'Smart-home technology',hint:'Simple plug-in devices & app setup',question:'How much are you connecting?',choices:{home:[['smart','One simple plug-in device'],['smart-bundle','Up to 3 devices in one visit'],['home-custom','I need help deciding']]}},
        support:{label:'Support & guidance',hint:'Patient help from a real person',question:'How would you like to work together?',choices:{home:[['coaching','Remote coaching'],['troubleshoot','At home / one computer issue'],['home-custom','Help me decide']],business:[['remote-business','Remote business support'],['business-custom','At my workplace / help me decide']]}},
        website:{label:'Build or redesign a website',hint:'A clear, useful home for your business',question:'What do you have in mind?',choices:{all:[['one-page','A new one-page website'],['business-site','A new website with up to 5 pages'],['redesign','Improve or redesign an existing site'],['web-custom','A larger project / not sure yet']]}},
        care:{label:'Website care & domain help',hint:'Keep your online presence working',question:'Where do you need a hand?',choices:{all:[['care','Ongoing technical website care'],['domain','Domain connection or hosting help'],['edits','Updates to an existing website']]}},
        automation:{label:'ACTIAS LUNA™ automation',hint:'Useful website actions, on agreed rules',question:'What should work automatically?',choices:{all:[['automation','One feature, such as a scheduled special'],['automation-pro','Several features or advanced scheduling'],['automation-custom','A custom integration / help me decide']]}}
    });
    const CUSTOM = Object.freeze({
        'home-custom':{title:'Home technology consultation',description:'Talk with Tom about your equipment, goals, and the right service.',anchor:'home-pricing'},
        'business-custom':{title:'Small-business technology support',description:'Plan around your team, equipment, and existing systems.',anchor:'business-pricing'},
        'web-custom':{title:'Custom website development',description:'Discuss the pages, content, and functionality your business needs.',anchor:'web-pricing'},
        redesign:{title:'Website redesign',description:'Review your existing website and agree on the changes that would help your visitors.',anchor:'web-pricing'},
        domain:{title:'Domain & hosting assistance',description:'Discuss your existing domain and hosting. Domain connection is included in standard website builds; standalone assistance needs a confirmed scope.',anchor:'web-pricing'},
        edits:{title:'Website updates',description:'Small edits and larger development work have different scopes. Tom will confirm what your existing website needs.',anchor:'web-pricing'},
        'automation-custom':{title:'ACTIAS LUNA™ custom implementation',description:'Explore an integration or automation around your business rules. Setup, operation, and third-party costs are agreed separately.',anchor:'web-pricing'}
    });
    const audienceLabel = value => value === 'business' ? 'Small business' : 'Home';
    function topicsFor(audience) {return Object.entries(TOPICS).filter(([,topic]) => topic.choices[audience] || topic.choices.all);}
    function choicesFor(audience, topic) {const item = Object.hasOwn(TOPICS,topic) ? TOPICS[topic] : null; return item ? item.choices[audience] || item.choices.all || [] : [];}
    function validChoice(audience, topic, choice) {return ['home','business'].includes(audience) && choicesFor(audience,topic).some(([id]) => id === choice);}
    function requestSummary(state, recommendation) {
        if (!validChoice(state.audience,state.topic,state.choice)) throw new Error('Invalid service selection');
        return ['SERVICE FINDER REQUEST','For: '+audienceLabel(state.audience),'Help with: '+TOPICS[state.topic].label,
            'Scope: '+choicesFor(state.audience,state.topic).find(([id]) => id === state.choice)[1],
            'Recommended service: '+recommendation.title,'Published price: '+recommendation.price,
            recommendation.description, recommendation.terms,'Please confirm suitability, scope and total cost before booking.'].join('\n');
    }
    if (typeof module !== 'undefined' && module.exports) {module.exports = {TOPICS,CUSTOM,topicsFor,choicesFor,validChoice,requestSummary}; return;}
    const app = document.getElementById('finderApp');
    if (!app || !window.FlexContact) return;
    const byId = id => document.getElementById(id);
    let state = {step:0,audience:'',topic:'',choice:''}, recommendation;
    function readRecommendation() {
        const custom = CUSTOM[state.choice];
        const web = ['website','care','automation'].includes(state.topic);
        const minimum = byId(state.audience+'-visit-minimum')?.textContent.replace(/^From /,'') || 'See full pricing';
        let terms = web ? 'Final scope requires confirmation. Domain registration and third-party fees are separate. Automation setup is quoted separately from monthly management.' : state.audience === 'home' ? 'Residential on-site minimum: '+minimum+'. This applies to asterisked device services too. Equipment, subscriptions, travel outside the included area, and extra work may cost more; see full terms.' : 'Business on-site minimum: '+minimum+'. Published service limits apply. Equipment, subscriptions and additional work are separate; see full terms.';
        if (custom) return {...custom,price:'Custom quote',terms};
        const row = byId('service-'+state.choice);
        if (!row) return {title:'Talk with Tom',description:'Please check the full pricing and service details with Tom.',price:'Scope and price to confirm',anchor:'pricing',terms};
        let description = row.querySelector('p').textContent;
        if (row.querySelector('.powered')) {
            description = row.querySelector('li:nth-child(2)').textContent;
            terms += ' '+row.querySelector('li:last-child').textContent+'. '+row.querySelector('p:not(.powered)').textContent;
        } else if (state.choice === 'care') {
            terms += ' '+row.querySelector('p:last-of-type').textContent;
        }
        return {title:row.querySelector('h4').textContent,description,price:row.querySelector('strong').textContent,anchor:row.id,terms};
    }
    function option(label, hint, onClick) {
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'finder-option';
        const title = document.createElement('strong'); title.textContent = label; button.append(title);
        if (hint) {const detail=document.createElement('span'); detail.textContent=hint; button.append(detail);}
        button.addEventListener('click',onClick);
        return button;
    }
    function render(focus = true) {
        byId('finderStatus').textContent = '';
        byId('finderStage').hidden = state.step === 3;
        byId('finderResult').hidden = state.step !== 3;
        byId('finderBack').hidden = state.step === 0;
        byId('finderRestart').hidden = state.step === 0;
        byId('finderProgress').textContent = ['01 / YOUR SETUP','02 / WHAT YOU NEED','03 / A FEW DETAILS','YOUR NEXT STEP'][state.step];
        byId('finderTrack').style.width = [25,50,75,100][state.step]+'%';
        const options = byId('finderOptions'); options.replaceChildren();
        const question = byId('finderQuestion');
        if (state.step === 0) {
            question.textContent = 'Where can I help?';
            for (const [id,label,hint] of [['home','At home','Make your everyday technology easier.'],['business','For my business','Connect your workplace and online presence.']]) options.append(option(label,hint,() => {state.audience=id;state.topic='';state.choice='';state.step=1;render();}));
        } else if (state.step === 1) {
            question.textContent = 'What do you need help with?';
            topicsFor(state.audience).forEach(([id,topic]) => options.append(option(topic.label,topic.hint,() => {state.topic=id;state.choice='';state.step=2;render();})));
        } else if (state.step === 2) {
            question.textContent = TOPICS[state.topic].question;
            choicesFor(state.audience,state.topic).forEach(([id,label]) => options.append(option(label,'',() => {state.choice=id;state.step=3;render();})));
        } else {
            recommendation = readRecommendation();
            byId('finderService').textContent = recommendation.title;
            byId('finderDescription').textContent = recommendation.description;
            byId('finderPrice').textContent = recommendation.price;
            byId('finderTerms').textContent = recommendation.terms;
            byId('finderAnswers').textContent = audienceLabel(state.audience)+' / '+TOPICS[state.topic].label+' / '+choicesFor(state.audience,state.topic).find(([id]) => id===state.choice)[1];
            byId('finderDetails').href = '#'+recommendation.anchor;
        }
        if (focus) (state.step===3 ? byId('finderService') : question).focus({preventScroll:true});
    }
    byId('finderBack').addEventListener('click',() => {state.step=Math.max(0,state.step-1);render();});
    byId('finderRestart').addEventListener('click',() => {state={step:0,audience:'',topic:'',choice:''};render();});
    byId('finderRequest').addEventListener('click',() => {
        if (!validChoice(state.audience,state.topic,state.choice)) return;
        if (!window.FlexContact.prepare('finder',requestSummary(state,recommendation))) byId('finderStatus').textContent='Your previous message is still sending. Please wait before preparing another request.';
    });
    render(false); app.hidden=false; byId('finderFallback').hidden=true;
})();
