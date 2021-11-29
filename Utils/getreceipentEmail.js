const getreceipantsEmail=(users, user)=> users.filter(i=> i!==user.email)[0];

export default getreceipantsEmail;