// ====== API ENDPOINTS ======
const API_EMPLOYEES = '/api/dashboard/employees';
const API_MENU      = '/api/dashboard/menu';
const API_ORDERS    = '/api/dashboard/orders';
const updateOrderStatusUrl = (id, value) => `/api/dashboard/orders/${id}/status?value=${encodeURIComponent(value)}`;

// ====== AUTH / LOGOUT ======
const meLabel = document.getElementById('meLabel');
const deptPill = document.getElementById('deptPill');
const logoutBtn = document.getElementById('logoutBtn');

const employeeId   = sessionStorage.getItem('employeeId');
const employeeName = sessionStorage.getItem('employeeName');
const department   = sessionStorage.getItem('department');

if (!employeeId) {
  window.location.href = 'login.html';
}

meLabel.textContent = employeeName ? `Logged in as ${employeeName} (${employeeId})` : `Logged in as ${employeeId}`;
deptPill.textContent = department ? department : 'Staff';

// 🔹 LOGOUT: Call backend to clock-out in Jira, then clear session
async function logout(){
  try {
    logoutBtn.disabled = true;
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include' // important for session cookies
    });
    if (!res.ok) {
      console.warn('Logout HTTP', res.status);
    }
  } catch (err) {
    console.error(err);
  } finally {
    sessionStorage.clear();
    window.location.href = 'login.html';
  }
}

logoutBtn.addEventListener('click', logout);

// ====== STATE ======
let employees = [];
let menuItems = [];
let orders = [];

// ====== UTIL ======
const el = s => document.querySelector(s);
const toast = (msg, ok=true) => {
  const t = el('#toast');
  if (!t) return;
  t.textContent = msg;
  t.style.background = ok ? '#111827' : '#b91c1c';
  t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), 2200);
};

// ====== TABS ======
document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.getAttribute('data-tab');
    el('#panel-employees').style.display = tab==='employees' ? '' : 'none';
    el('#panel-menu').style.display      = tab==='menu' ? '' : 'none';
    el('#panel-orders').style.display    = tab==='orders' ? '' : 'none';
  });
});

// ====== FETCHES ======
async function fetchEmployees(){
  const res = await fetch(API_EMPLOYEES);
  employees = await res.json();
  renderEmployees();
  renderEmpKPIs();
}
async function fetchMenu(){
  const res = await fetch(API_MENU);
  menuItems = await res.json();
  renderMenu();
}
async function fetchOrders(){
  const res = await fetch(API_ORDERS);
  orders = await res.json();
  renderOrders();
}

// ====== EMPLOYEES RENDER ======
function renderEmpKPIs(){
  const dep = name => employees.filter(e => (e.department||'').toLowerCase()===name.toLowerCase()).length;
  el('#kpi-total').textContent = employees.length || 0;
  el('#kpi-admins').textContent = dep('Admin');
  el('#kpi-chefs').textContent = dep('Chef/Kitchen');
  el('#kpi-frontdesk').textContent = dep('Front Desk');
}

function renderEmployees(){
  const tbody = el('#employeeTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  const filterVal = el('#departmentFilter')?.value || 'All';
  const q = (el('#empSearch')?.value || '').toLowerCase();

  employees
    .filter(emp => filterVal==='All' || (emp.department===filterVal))
    .filter(emp => {
      const blob = `${emp.name} ${emp.email} ${emp.role} ${emp.department}`.toLowerCase();
      return blob.includes(q);
    })
    .forEach(emp=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${emp.name||''}</td>
        <td>${emp.role||''}</td>
        <td>${emp.employeeId||''}</td>
        <td>${emp.email||''}</td>
        <td>${emp.phone||''}</td>
        <td>${emp.address||''}</td>
        <td>${emp.department||''}</td>
      `;
      tbody.appendChild(tr);
    });
}

// ====== MENU RENDER ======
function renderMenu(){
  const tbody = el('#menuTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  const q = (el('#menuSearch')?.value || '').toLowerCase();

  menuItems
    .filter(m => {
      const blob = `${m.category} ${m.type} ${m.item_name || m.itemName} ${m.description}`.toLowerCase();
      return blob.includes(q);
    })
    .forEach(m=>{
      const name = m.item_name || m.itemName || '';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${m.category||''}</td>
        <td>${m.type||''}</td>
        <td>${name}</td>
        <td>${m.description||''}</td>
        <td>${Number(m.price||0).toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });
}

// ====== ORDERS RENDER ======
function statusBadge(st){
  const s = (st||'').toLowerCase();
  if(s==='pending') return '<span class="badge b-pending">Pending</span>';
  if(s==='preparing') return '<span class="badge b-preparing">Preparing</span>';
  if(s==='ready') return '<span class="badge b-ready">Ready</span>';
  if(s==='delivered') return '<span class="badge b-delivered">Delivered</span>';
  return `<span class="badge" style="background:#94a3b8">${st||'—'}</span>`;
}

function renderOrders(){
  const tbody = el('#ordersTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  const q = (el('#orderSearch')?.value || '').toLowerCase();

  orders
    .filter(o=>{
      const blob = `${o.id} ${o.customer_name||o.customerName||''} ${o.item_name||o.itemName||''} ${o.status||''}`.toLowerCase();
      return blob.includes(q);
    })
    .forEach(o=>{
      const id = o.id;
      const customer = o.customer_name || o.customerName || '—';
      const item = o.item_name || o.itemName || '—';
      const qty = o.quantity ?? '—';
      const status = o.status || '—';
      const time = o.order_time || o.orderTime || '—';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${id}</td>
        <td>${customer}</td>
        <td>${item}</td>
        <td>${qty}</td>
        <td>${statusBadge(status)}</td>
        <td>${time}</td>
        <td class="row-actions">
          <select data-id="${id}" class="status-select">
            <option ${status==='Pending'?'selected':''}>Pending</option>
            <option ${status==='Preparing'?'selected':''}>Preparing</option>
            <option ${status==='Ready'?'selected':''}>Ready</option>
            <option ${status==='Delivered'?'selected':''}>Delivered</option>
          </select>
          <button class="btn btn--update" data-update="${id}">Update</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

  tbody.querySelectorAll('[data-update]').forEach(btn=>{
    btn.onclick = async () => {
      const id = btn.getAttribute('data-update');
      const sel = tbody.querySelector(`select[data-id="${id}"]`);
      const value = sel?.value;
      if(!value){ toast('Pick a status first', false); return; }
      try{
        const res = await fetch(updateOrderStatusUrl(id, value), { method:'PUT' });
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        toast(`Order #${id} → ${value}`);
        fetchOrders();
      }catch(e){
        console.error(e);
        toast('Failed to update status', false);
      }
    };
  });
}

// ====== EVENTS ======
document.getElementById('departmentFilter')?.addEventListener('change', renderEmployees);
document.getElementById('empSearch')?.addEventListener('input', renderEmployees);
document.getElementById('menuSearch')?.addEventListener('input', renderMenu);
document.getElementById('orderSearch')?.addEventListener('input', renderOrders);

// ====== INIT ======
(async function init(){
  try{
    await Promise.all([fetchEmployees(), fetchMenu(), fetchOrders()]);
  }catch(e){
    console.error(e);
    toast('Failed to load data', false);
  }
  setInterval(fetchOrders, 10000);
})();
