
export const useSession = () => {

  const handleGetSession = () => {
    const s = localStorage.getItem('session');
    if(s != null && typeof s == 'string') {
      return JSON.parse(s);
    }

    return null;
  }
  const handleSession = (session) => {
    if(!session) {
      localStorage.clear();
    } else if(typeof session == 'string') {
      localStorage.setItem('session', session);
    } else if(typeof session == 'object') {
      localStorage.setItem('session', JSON.stringify(session));
    }
  }

  return ({
    handleSession,
    handleGetSession,
  })
}