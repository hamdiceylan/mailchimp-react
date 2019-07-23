# mailchimp-react

It provides an easy-to configure component to add a mailchimp form to your react project

# Install

```npm
npm install mailchimp-react
```

Be sure to include the --save option to add this as a dependency in your application's package.json

# Usage

First you have to configure your Mailchimp account:

1. Create a new account or use an existing one
2. Add a new list or use an existing one
3. Personalize the fields on your list on "Settings > List Fieds"
4. Copy the HTML and extract the action from "Signup Forms > Embedded forms"

The action URL will look like this:

```
https://<YOUR-USER>.usX.list-manage.com/subscribe/post?u=XXXXXXXXXXXXX&amp;id=XXXXXX
```

We will use this URL to configure the component

```js
import React from "react";
import MailchimpReact from "mailchimp-react";
export default () => (
  <MailchimpReact action="https://<YOUR-USER>.us16.list-manage.com/subscribe/post?u=XXXXXXXXXXXXX&amp;id=XXXXXX" />
);
```

# Options

### Messages

Personalize or change the message language by default

### ClassName

Add a personalized class to personalize your form

# License

Mailchimp-react is released under the [MIT License](https://opensource.org/licenses/MIT).
