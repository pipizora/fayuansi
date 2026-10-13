let traditionalCursor=true;
try{traditionalCursor=localStorage.getItem('fayuansi-cursor')!=='plain'}catch{}
document.body.classList.toggle('traditional-cursor',traditionalCursor);
document.addEventListener('click',e=>{
 if(e.target.id==='cursorSwitch'){
  traditionalCursor=!traditionalCursor;document.body.classList.toggle('traditional-cursor',traditionalCursor);
  e.target.textContent=traditionalCursor?'使用普通鼠标':'使用毛笔光标';
  try{localStorage.setItem('fayuansi-cursor',traditionalCursor?'traditional':'plain')}catch{}
 }
});
document.querySelector('#aboutBtn').addEventListener('click',()=>{
 const option=document.createElement('div');option.className='cursor-option';option.innerHTML='<span>毛笔光标：笔尖为点击位置</span><button id="cursorSwitch">'+(traditionalCursor?'使用普通鼠标':'使用毛笔光标')+'</button>';
 document.querySelector('#modalContent').prepend(option);
});
