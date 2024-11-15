import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    setShowAddFriend(() => !showAddFriend);
  };

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    handleShowAddFriend();
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend((curr) => (curr?.id === friend.id ? '' : friend));
    setShowAddFriend(false);
  };

  const handleSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          setFriends={setFriends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {!showAddFriend && (
          <Button onClick={handleShowAddFriend}>Add Friend</Button>
        )}
        {showAddFriend && (
          <div>
            <FormAddFriend
              showAddFriend={showAddFriend}
              setShowAddFriend={setShowAddFriend}
              onShowAddFriend={handleShowAddFriend}
              onAddFriend={handleAddFriend}
            />
          </div>
        )}
        {/* <Button>Add Friend</Button> */}
      </div>

      <div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </div>
  );
}

const Button = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

const FriendsList = ({
  friends,
  onSelectFriend,
  selectedFriend,
  onShowAddFriend,
}) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};

const Friend = ({ friend, onSelectFriend, selectedFriend }) => {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <div className="sidebar">
      <li className={isSelected ? 'selected' : ''}>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>

        {friend.balance === 0 ? (
          <p>You and {friend.name} are even</p>
        ) : friend.balance > 0 ? (
          <p className="green">
            {friend.name} owes you ${friend.balance}
          </p>
        ) : (
          <p className="red">
            You owe {friend.name} ${Math.abs(friend.balance)}
          </p>
        )}
        <Button
          onClick={() => {
            onSelectFriend(friend);
          }}
        >
          {isSelected ? 'Close' : 'Select'}
        </Button>
      </li>
    </div>
  );
};

const FormAddFriend = ({ onShowAddFriend, onAddFriend }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);
    setName('');
    setImage('https://i.pravatar.cc/48');
  };

  return (
    <div className="sidebar">
      <form className="form form-add-friend" onSubmit={handleSubmit}>
        <label>👫 Friend Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>🌅 Image URL: </label>
        <input
          type="text"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <Button>Add</Button>
      </form>
      <Button onClick={onShowAddFriend}>Close</Button>
    </div>
  );
};

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : '';
  const [paying, setPaying] = useState('user');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(paying === 'user' ? paidByFriend : -paidByUser);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>

      <label>💰 Bill Value: </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍🏼 Your Expense: </label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👫 {selectedFriend.name}'s Expense: </label>
      <input disabled value={paidByFriend} />

      <label>🤑 Who's Paying? </label>
      <select value={paying} onChange={(e) => setPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
};
