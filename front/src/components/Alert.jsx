import { AlertContext } from '../context/AlertContext';
import '../styles/Alert.css';
import { useContext, useEffect, useState } from "react";

export default function Alert() {
  const { _alert } = useContext(AlertContext);
  const [alertTimeout, alertSetTimeout] = useState(0);

  useEffect(() => {
    alertSetTimeout(clearTimeout(alertTimeout))

    if(_alert.state == 'new'){
      _alert.reload();
    }
    else{
      alertSetTimeout(setTimeout(() => {
        _alert.close()
      }, _alert.duration * 1000));
    }

  }, [_alert.state])

  if(_alert.state == 'active'){
    return (
    <div className={'alert ' + _alert.style}>
      <p>{_alert.message}</p>
    </div>
    )
  }
  else return <></>
}