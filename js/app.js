// Para incrustar un video propio, agrega yt:"ID_DE_YOUTUBE" a la lección.
const ESTILOS=[
 {n:"Crol (Libre)",l:[
  {t:"Posición del cuerpo",d:"Mantén el cuerpo horizontal, alineado y relajado, con la cabeza neutra y la mirada hacia el fondo. Una buena posición reduce la resistencia del agua y te hace avanzar con menos esfuerzo."},
  {t:"Brazada",d:"Entra la mano por delante del hombro, jala el agua hacia la cadera con el codo alto y recupera el brazo fuera del agua. Alterna ambos brazos con un ritmo continuo."},
  {t:"Patada",d:"Patea desde la cadera con las piernas casi estiradas y los tobillos sueltos. Es un batido corto y constante que da equilibrio y propulsión."},
  {t:"Respiración y coordinación",d:"Gira la cabeza hacia un lado cuando un brazo termina la brazada y toma aire por la boca; exhala dentro del agua. Aprende a respirar cada 2 o 3 brazadas."}]},
 {n:"Espalda",l:[
  {t:"Posición del cuerpo",d:"Flota boca arriba con la cadera alta, el pecho abierto y la cabeza quieta con la mirada al techo. Los oídos quedan sumergidos para mantener la estabilidad."},
  {t:"Brazada",d:"Los brazos giran alternadamente: entra la mano con el meñique primero, jala bajo el agua y sale con el pulgar. Acompaña con una ligera rotación de hombros."},
  {t:"Patada",d:"Patada alterna y continua desde la cadera, con las rodillas casi sin salir del agua y los pies relajados. Debe generar un burbujeo suave en la superficie."},
  {t:"Respiración y coordinación",d:"Al ir boca arriba puedes respirar con libertad: inhala con un brazo y exhala con el otro. Practica el ritmo para no perder la línea recta."}]},
 {n:"Pecho (Braza)",l:[
  {t:"Posición del cuerpo",d:"El cuerpo se mantiene lo más horizontal posible y se eleva un poco al respirar. Después de cada ciclo, estírate para deslizarte."},
  {t:"Brazada",d:"Los brazos se abren hacia afuera, barren en forma de corazón hacia el pecho y se extienden hacia adelante. Todo el movimiento ocurre dentro del agua."},
  {t:"Patada",d:"Flexiona las rodillas, abre los pies con las puntas hacia afuera y empuja en círculo hasta juntar las piernas estiradas. Es la fase que más impulsa."},
  {t:"Respiración y coordinación",d:"Respira cuando las manos barren hacia adentro y vuelve al agua al estirar. La secuencia es: brazada, respiro, patada, deslizamiento."}]},
 {n:"Mariposa",l:[
  {t:"Posición del cuerpo",d:"El cuerpo ondula como una ola: el pecho se hunde y la cadera sube y baja siguiendo el movimiento. Es la base de todo el estilo."},
  {t:"Brazada",d:"Ambos brazos entran juntos a la altura de los hombros, jalan en forma de cerradura y salen por encima del agua simultáneamente."},
  {t:"Patada (delfín)",d:"Las dos piernas juntas golpean al mismo tiempo, iniciando el movimiento desde el pecho y la cadera. Se hacen dos patadas por cada ciclo de brazos."},
  {t:"Respiración y coordinación",d:"Levanta la cabeza hacia adelante al final de la brazada, respirando cada uno o dos ciclos. La primera patada acompaña la entrada y la segunda la salida de las manos."}]}
];

const lista=document.getElementById('listaEstilos');
const caja=document.getElementById('contenido');
const menu=document.getElementById('menuPrincipal');

function cerrarMenus(){document.querySelectorAll('.dropdown-menu.show,.nav-link.show').forEach(e=>e.classList.remove('show'))}

function mostrar(estilo,o){
  const q=encodeURIComponent('natación '+estilo+' '+o.t+' técnica para principiantes');
  const video=o.yt
    ?`<iframe src="https://www.youtube.com/embed/${o.yt}" allowfullscreen></iframe>`
    :`<div><div class="display-4">▶️</div><p class="mb-2">Video: ${o.t} (${estilo})</p><a class="btn btn-rojo" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${q}">Ver video en YouTube</a></div>`;
  caja.innerHTML=`<div class="card-body"><span class="etiqueta">${estilo}</span><h2>${o.t}</h2><p class="fs-6">${o.d}</p><div class="ratio ratio-16x9 mt-3"><div class="video-caja">${video}</div></div></div>`;
  cerrarMenus();menu.classList.remove('show');
  caja.scrollIntoView({behavior:'smooth',block:'start'});
}

function inicio(){
  caja.innerHTML=`<div class="card-body"><span class="etiqueta">Bienvenido</span><h2>Aprende a nadar paso a paso</h2>
  <p>Elige un estilo en la barra roja y luego una de sus lecciones. Cada una incluye la descripción de lo que debes aprender y un video guía.</p>
  <div class="row g-2">${ESTILOS.map((s,i)=>`<div class="col-6 col-md-3"><button class="btn btn-azul w-100" data-i="${i}">${s.n}</button></div>`).join('')}</div></div>`;
  caja.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>mostrar(ESTILOS[b.dataset.i].n,ESTILOS[b.dataset.i].l[0]));
}

ESTILOS.forEach(s=>{
  const li=document.createElement('li');li.className='nav-item dropdown';
  const a=document.createElement('a');a.href='#';a.className='nav-link dropdown-toggle';a.textContent=s.n;
  const ul=document.createElement('ul');ul.className='dropdown-menu';
  s.l.forEach((o,i)=>{
    const it=document.createElement('li'),b=document.createElement('a');
    b.href='#';b.className='dropdown-item';b.textContent=(i+1)+'. '+o.t;
    b.onclick=e=>{e.preventDefault();mostrar(s.n,o)};
    it.appendChild(b);ul.appendChild(it);
  });
  a.onclick=e=>{e.preventDefault();e.stopPropagation();const abierto=ul.classList.contains('show');cerrarMenus();if(!abierto){ul.classList.add('show');a.classList.add('show')}};
  li.append(a,ul);lista.appendChild(li);
});
document.addEventListener('click',cerrarMenus);
document.getElementById('toggler').onclick=()=>menu.classList.toggle('show');
inicio();
