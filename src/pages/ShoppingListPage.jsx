import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Icon from '../components/Icon.jsx';

export default function ShoppingListPage() {
  const { shoppingList, setShoppingList } = useApp();
  const [newItem, setNewItem] = useState('');
  const remaining = useMemo(() => shoppingList.filter((item) => !item.checked), [shoppingList]);
  const checked = useMemo(() => shoppingList.filter((item) => item.checked), [shoppingList]);

  function addItem(event) {
    event.preventDefault();
    const name = newItem.trim();
    if (!name) return;
    if (!shoppingList.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
      setShoppingList((items) => [...items, { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, name, checked: false }]);
    }
    setNewItem('');
  }

  function updateItem(id, changes) {
    setShoppingList((items) => items.map((item) => item.id === id ? { ...item, ...changes } : item));
  }

  return <div className="collection-page container shopping-page">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Shopping list</span></div>
    <div className="simple-page-heading"><span className="eyebrow"><Icon name="bag" size={16} /> The handy little list</span><h1>Shop for the <em>good stuff.</em></h1><p>All the ingredients you want to remember, in one easy-to-check list.</p></div>
    <div className="shopping-board">
      <div className="shopping-board__head"><div><strong>{remaining.length} to pick up</strong><span>{checked.length ? `${checked.length} already in the basket` : 'Add a few things and you’re set'}</span></div>{shoppingList.length > 0 && <button type="button" className="text-link shopping-clear" onClick={() => setShoppingList([])}>Clear list <Icon name="trash" size={15} /></button>}</div>
      <form className="add-shopping-item" onSubmit={addItem}><Icon name="plus" size={18} /><label className="sr-only" htmlFor="new-item">Add an item</label><input id="new-item" value={newItem} onChange={(event) => setNewItem(event.target.value)} placeholder="Add something to the list…" required /><button type="submit" className="button button--primary">Add item</button></form>
      {shoppingList.length ? <>
        {remaining.length > 0 && <ul className="shopping-items">{remaining.map((item) => <li key={item.id}><label><input type="checkbox" checked={item.checked} onChange={(event) => updateItem(item.id, { checked: event.target.checked })} /><span className="custom-check"><Icon name="check" size={13} /></span><span>{item.name}</span></label><button type="button" className="icon-button shopping-delete" aria-label={`Remove ${item.name}`} onClick={() => setShoppingList((items) => items.filter((entry) => entry.id !== item.id))}><Icon name="trash" size={16} /></button></li>)}</ul>}
        {checked.length > 0 && <div className="checked-items"><div className="checked-items__heading"><span>In the basket</span><button type="button" className="text-link" onClick={() => setShoppingList((items) => items.filter((item) => !item.checked))}>Clear checked</button></div><ul className="shopping-items shopping-items--checked">{checked.map((item) => <li key={item.id}><label><input type="checkbox" checked onChange={() => updateItem(item.id, { checked: false })} /><span className="custom-check"><Icon name="check" size={13} /></span><span>{item.name}</span></label><button type="button" className="icon-button shopping-delete" aria-label={`Remove ${item.name}`} onClick={() => setShoppingList((items) => items.filter((entry) => entry.id !== item.id))}><Icon name="trash" size={16} /></button></li>)}</ul></div>}
      </> : <div className="empty-state empty-state--shopping"><div className="empty-state__icon"><Icon name="bag" size={25} /></div><h2>Your list is ready for good things.</h2><p>Add a few essentials here, or open a recipe and send its ingredients straight to your list.</p><Link to="/recipes" className="button button--outline">Browse recipes <Icon name="arrow" size={16} /></Link></div>}
    </div>
    <p className="shopping-footnote"><Icon name="check" size={16} /> Your list is saved on this device, so it’ll be here when you come back.</p>
  </div>;
}
