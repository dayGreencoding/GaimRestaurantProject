import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function MenuItemModal({
  isOpen,
  onClose,
  item,
  quantity,
  setQuantity,
  instructions,
  setInstructions,
  toppings,
  setToppings,
  onAddToCart,
  availableToppings,
  maxInstructionsLength
}) {
  if (!item) return null;

  const handleToppingChange = (topping) => {
    setToppings(prev =>
      prev.includes(topping)
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Menu Item Detail"
      className="modal"
      overlayClassName="modal-overlay"
    >
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}
        />
      )}
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontWeight: 'bold' }}>Quantity</label><br />
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value))}
          style={{ width: '60px', marginTop: '0.5rem' }}
        />
        <p style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>
          Total: ${(item.price * quantity).toFixed(2)}
        </p>
      </div>

      <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.4rem' }}>
          Special Instructions
        </label>
        <textarea
          value={instructions}
          onChange={(e) => {
            if (e.target.value.length <= maxInstructionsLength) {
              setInstructions(e.target.value);
            }
          }}
          rows="3"
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '0.95rem',
            resize: 'none',
            fontFamily: 'inherit',
          }}
          placeholder="e.g. No onions, extra spicy..."
        />
        <div style={{
          textAlign: 'right',
          fontSize: '0.8rem',
          color: instructions.length === maxInstructionsLength ? 'red' : '#555',
          marginTop: '0.2rem'
        }}>
          {maxInstructionsLength - instructions.length} characters left
        </div>
      </div>

      <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
        <strong>Choose Toppings:</strong>
        {availableToppings.map(topping => (
          <div key={topping}>
            <label>
              <input
                type="checkbox"
                value={topping}
                checked={toppings.includes(topping)}
                onChange={() => handleToppingChange(topping)}
              />
              {' '}{topping}
            </label>
          </div>
        ))}
      </div>

      <button onClick={onAddToCart}>Add to Cart</button>
      <button onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
    </Modal>
  );
}

export default MenuItemModal;
