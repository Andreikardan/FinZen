import { Button } from 'antd';
import React from 'react';


interface UserCardProps {
  user: {
    username: string;
    email: string;
    img: string; 
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Button
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          border: 'none',
          backgroundImage: `url(http://localhost:3000/static/images/DefaultUser.svg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          cursor: 'pointer',
          padding: 0,
        }}
        onClick={() => {}}
      ></Button>

      <div style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
        {user.username}
      </div>

      <div style={{ marginTop: '5px', fontSize: '14px', color: '#666' }}>
        {user.email}
      </div>
    </div>
  );
};

export default UserCard;