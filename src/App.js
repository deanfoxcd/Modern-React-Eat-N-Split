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

  const handleShowAddFriend = () => {
    setShowAddFriend(() => setShowAddFriend(!showAddFriend));
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {!showAddFriend && (
          <Button onClick={handleShowAddFriend}>Add Friend</Button>
        )}
        {showAddFriend && (
          <div>
            <FormAddFriend
              showAddFriend={showAddFriend}
              setShowAddFriend={setShowAddFriend}
              onShowAddFriend={handleShowAddFriend}
            />
          </div>
        )}
        {/* <Button>Add Friend</Button> */}
      </div>
      <div>
        <FormSplitBill />
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

const FriendsList = () => {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
};

const Friend = ({ friend }) => {
  return (
    <div className="sidebar">
      <li>
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
        <Button>Select </Button>
      </li>
    </div>
  );
};

const FormAddFriend = ({
  showAddFriend,
  setShowAddFriend,
  onShowAddFriend,
}) => {
  return (
    <div className="sidebar">
      <form className="form form-add-friend">
        <label>👫 Friend Name: </label>
        <input type="text" />
        <label>🌅 Image URL: </label>
        <input type="text" />
        <Button>Add</Button>
      </form>
      <Button onClick={onShowAddFriend}>Close</Button>
    </div>
  );
};

const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH XXXXX</h2>
      <label>💰 Bill Value: </label>
      <input type="text" />
      <label>🧍🏼 Your Expense: </label>
      <input type="text" />
      <label>👫 XXXXX's Expense: </label>
      <input disabled />
      <label>🤑 Who's Paying? </label>
      <select>
        <option value="user">You</option>
        <option value="friend">XXXX</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
};
