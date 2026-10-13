const graphNodes=[['慈禧',540,60,'宫廷权力','court'],['光绪',540,205,'皇帝','court'],['恭亲王',125,205,'奕訢 · 洋务宗室','old'],['李鸿章',125,365,'洋务与外交','old'],['荣禄',320,365,'军政重臣','old'],['袁世凯',320,535,'新军统领','military'],['徐世昌',125,680,'袁的政治同道','military'],['康有为',850,205,'维新倡议者','reform'],['梁启超',1060,365,'卓如 · 康门弟子','reform'],['谭嗣同',655,365,'复生 · 四章京','reform'],['杨锐',655,535,'四章京','reform'],['刘光第',850,535,'四章京','reform'],['林旭',1060,535,'四章京','reform'],['张之洞',655,680,'杨锐的幕主','old'],['康广仁',850,680,'康有为之弟','family'],['沈鹊应',1060,680,'林旭之妻','family']];
const graphEdges=[
['慈禧','光绪','皇太后与皇帝','power','宫廷关系是全剧核心。光绪是皇帝，慈禧仍有深厚的权力网络。'],
['慈禧','恭亲王','合作 / 权力矛盾','power','奕訢长期参与中枢政务，与慈禧既有合作，也有矛盾。'],
['慈禧','荣禄','倚重','power','荣禄是慈禧倚重的军政重臣。'],
['慈禧','李鸿章','臣属','power','李鸿章长期参与洋务与对外交涉，不能据此认为他反对所有改革。'],
['光绪','康有为','君臣 / 新政建议','power','康有为向光绪提出改革建议，试图更直接参与决策。'],
['光绪','谭嗣同','受命参赞新政','power','谭嗣同与杨锐、刘光第、林旭共同受命参与新政。'],
['康有为','梁启超','师生','teacher','梁启超从康有为问学；剧中也写两人对政治和生死选择的分歧。'],
['康有为','康广仁','兄弟','family','康广仁是康有为之弟，也是六君子之一。'],
['梁启超','谭嗣同','精神同道 / 剧中结拜','drama','本剧以结拜表现谭、梁的精神情谊，具体仪式需另查史料。'],
['谭嗣同','袁世凯','夜访 / 争取军队','military','谭夜访袁以争取军事行动，细节和记述存在史料争议。'],
['荣禄','袁世凯','军政上级与下属','military','袁不能脱离荣禄及既有指挥、补给体系随意行动。'],
['李鸿章','袁世凯','提携 / 政治网络','military','剧中袁称李为恩师，表现其既有洋务与军事网络。'],
['袁世凯','徐世昌','政治同道','military','剧中把徐世昌与袁联系，并追问徐参与密议的情况。'],
['杨锐','张之洞','幕僚 / 师友','teacher','杨锐曾在张之洞幕府任事，剧中以此反对笼统的康党归类。'],
['林旭','沈鹊应','夫妻','family','剧本通过两人的离别与诗文表现政治事件对家庭的冲击。'],
['谭嗣同','杨锐','新政同僚','peer','同为四章京，对密诏、救驾的理解并不完全相同。'],
['杨锐','刘光第','新政同僚','peer','共同受命，不意味着学术立场和每项行动完全相同。'],
['刘光第','林旭','新政同僚','peer','同为四章京，共同在戊戌政变后遇害。']];
const graphKinds={power:['君臣 / 权力','#778875'],teacher:['师生 / 师友','#a27b48'],family:['亲属 / 夫妻','#a65343'],military:['军政 / 同道','#577a87'],drama:['剧中结拜','#9a7897'],peer:['新政同僚','#8e9371']};
let graphFocus=null;
function edgePath(a,b){const x1=a[1],y1=a[2],x2=b[1],y2=b[2];if(Math.abs(x1-x2)<10 && Math.abs(y2-y1)>250)return `M${x1+73},${y1} C${x1+110},${y1} ${x2+110},${y2} ${x2+73},${y2}`;if(Math.abs(x1-x2)<10)return `M${x1},${y1+37} L${x2},${y2-37}`;if(Math.abs(y1-y2)<10){const s=x2>x1?1:-1;return `M${x1+s*73},${y1} L${x2-s*73},${y2}`;}const startY=y1+(y2>y1?35:-35),endY=y2+(y2>y1?-35:35),mid=(startY+endY)/2;return `M${x1},${startY} C${x1},${mid} ${x2},${mid} ${x2},${endY}`}
renderPeople=function(){
const focus=graphFocus,linked=new Set(focus?[focus,...graphEdges.filter(e=>e[0]===focus||e[1]===focus).flatMap(e=>e.slice(0,2))]:graphNodes.map(n=>n[0]));
const edges=graphEdges.map(e=>{const a=graphNodes.find(n=>n[0]===e[0]),b=graphNodes.find(n=>n[0]===e[1]),on=!focus||e[0]===focus||e[1]===focus,mx=(a[1]+b[1])/2,my=(a[2]+b[2])/2;return `<g class="graph-edge ${on?'on':'faded'}"><path d="${edgePath(a,b)}" stroke="${graphKinds[e[3]][1]}" ${['drama','peer'].includes(e[3])?'stroke-dasharray="6 5"':''}/>${on&&(focus||['family','teacher','military'].includes(e[3]))?`<text x="${mx}" y="${my-6}" text-anchor="middle" class="edge-label">${esc(e[2])}</text>`:''}</g>`}).join('');
const nodes=graphNodes.map(n=>`<g role="button" tabindex="0" aria-label="查看${n[0]}的关系" data-graph-person="${n[0]}" class="graph-node ${linked.has(n[0])?'':'faded'} ${focus===n[0]?'focused':''}" transform="translate(${n[1]-73},${n[2]-33})"><rect width="146" height="66" rx="3" class="node-${n[4]}"/><text x="73" y="28" text-anchor="middle" class="node-name">${n[0]}</text><text x="73" y="48" text-anchor="middle" class="node-role">${n[3]}</text></g>`).join('');
const es=focus?graphEdges.filter(e=>e[0]===focus||e[1]===focus):[];
$('#peopleView').innerHTML=`<span class="eyebrow">PEOPLE & CONNECTIONS</span><h2>一场变局，千丝万缕。</h2><p class="lead">宫廷在上，军政网络在左，维新人物在右，家庭与师友在下。点击人物，突出他的直接关系。</p><div class="graph-toolbar"><div class="graph-legend">${Object.entries(graphKinds).map(([k,v])=>`<span><i style="background:${v[1]}"></i>${v[0]}</span>`).join('')}</div><button id="graphReset">显示全部关系</button></div><p class="graph-hint">手机上可横向滑动关系图；点击人物后，下方显示关系说明。</p><div class="graph-scroll"><svg class="relationship-map" viewBox="0 0 1200 745" role="group" aria-label="北京法源寺人物关系图"><text x="70" y="78" class="cluster-label">洋务与军政网络</text><text x="910" y="78" class="cluster-label">维新与思想网络</text><text x="495" y="120" class="cluster-label">宫廷权力</text>${edges}${nodes}</svg></div><section class="graph-detail" aria-live="polite">${focus?`<div><span class="chapter-label">直接关系 · ${es.length} 条</span><h3>${esc(focus)}</h3><button class="original-btn" data-person-search="${esc(focus)}">阅读相关台词 →</button></div><div>${es.map(e=>{const other=e[0]===focus?e[1]:e[0];return `<article><button data-graph-person="${other}">${esc(other)}</button><span class="graph-relation" style="color:${graphKinds[e[3]][1]}">${esc(e[2])}</span><p>${esc(e[4])}</p></article>`}).join('')}</div>`:`<div><h3>先选一个人物。</h3><p>点击康有为，看师生、兄弟与君臣；点击袁世凯，看军政网络与夜访。</p></div>`}</section><p class="note-meta">连线用于阅读导航，不表示正式政党隶属。虚线包括剧中安排和同僚联系；史实与争议可查知识索引。四章京之外，杨深秀与康广仁也属于六君子。本图展示主要关系，未穷尽全部人物。</p>`;
};
document.addEventListener('click',e=>{const n=e.target.closest('[data-graph-person]');if(n){graphFocus=n.dataset.graphPerson;renderPeople()}if(e.target.id==='graphReset'){graphFocus=null;renderPeople()}});
document.addEventListener('keydown',e=>{const n=e.target.closest('[data-graph-person]');if(n&&(e.key==='Enter'||e.key===' ')){e.preventDefault();graphFocus=n.dataset.graphPerson;renderPeople()}});
