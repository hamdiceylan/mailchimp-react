import React, { useState } from 'react';
import jsonp from 'jsonp';
export default ({
  styles = {
    sendingMsg: {
      color: '#0652DD'
    },
    successMsg: {
      color: '#009432'
    },
    duplicateMsg: {
      color: '#EE5A24'
    },
    errorMsg: {
      color: '#ED4C67'
    }
  },
  className,
  namePlaceHolder = 'Please type your name',
  placeHolder = 'Please type your email',
  buttonClassName,
  action,
  messages = {
    sending: 'Sending...',
    success: 'Thank you for subscribing!',
    error: 'An unexpected internal error has occurred.',
    empty: 'You must write an e-mail.',
    duplicate: 'Too many subscribe attempts for this email address',
    button: 'Subscribe!'
  }
}) => {
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    const url = `${action}&EMAIL=${email}&FNAME=${name}`.replace(
      '/post?',
      '/post-json?'
    );
    const regex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
    !regex.test(email) ? setStatus('empty') : sendData(url);
  };
  const sendData = url => {
    setStatus('sending');
    jsonp(url, { param: 'c' }, (err, data) => {
      if (data.msg.includes('already subscribed')) {
        setStatus('duplicate');
      } else if (err) {
        setStatus('error');
      } else if (data.result !== 'success') {
        setStatus('error');
      } else {
        setStatus('success');
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        placeholder={namePlaceHolder}
        onChange={e => setName(e.target.value)}
        defaultValue={name}
      />
      <input
        placeholder={placeHolder}
        onChange={e => setEmail(e.target.value)}
        defaultValue={email}
      />
      <button
        disabled={status === 'sending' || status === 'success'}
        type='submit'
        className={buttonClassName}
      >
        {messages.button}
      </button>
      <div className='msg-alert'>
        {status === 'sending' &&
          <p style={styles.sendingMsg}>
            {messages.sending}
          </p>}
        {status === 'success' &&
          <p style={styles.successMsg}>
            {messages.success}
          </p>}
        {status === 'duplicate' &&
          <p style={styles.duplicateMsg}>
            {messages.duplicate}
          </p>}
        {status === 'empty' &&
          <p style={styles.errorMsg}>
            {messages.empty}
          </p>}
        {status === 'error' &&
          <p style={styles.errorMsg}>
            {messages.error}
          </p>}
      </div>
    </form>
  );
};
