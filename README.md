# Busy Buy 2 (Redux)

An easy-to-use online store where you can shop for various products. It is a modern e-commerce platform with various features aimed at providing a seamless shopping experience.

[Live app](https://busy-buy-app-gamma.vercel.app/)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Account Management:

  - Sign Up & Sign In: You can create an account or log in to access personalized features.
  - Secure Access: Certain features, like checking your orders, are only available once you’re logged in.
  - User Management: Users can sign up, sign in, and log out. Authentication is handled using Firebase, ensuring secure user management.
  - Protected Routes: Certain routes, like viewing orders or the cart, are protected and require user authentication to access.

- Shopping Experience:

  - Browse Products: Explore a wide range of items available for purchase.
  - Filter & Search: Find products by category or price to make shopping easier.
  - Product Listings: Users can browse through a list of products fetched from a mock API.
  - Categories & Filtering: Products can be filtered by category and price range, enhancing the shopping experience.

- Shopping Cart:

  - Add & Remove Items: You can add items to your cart, adjust quantities, or remove them if you change your mind.
  - View Cart: Your cart keeps track of what you plan to buy and shows the total cost.

- Order Placement:

  - Place Orders: When you’re ready, you can place an order directly from your cart.
  - View Past Orders: You can check your previous orders to see what you’ve bought.

- User Interface:

  - Navigation Bar: Easily move around the site to access different sections like your cart or orders.
  - Loading & Notifications: The app lets you know when things are loading and shows messages to keep you informed.

- State Management:

  - Global State: Redux Reducers are used to manage global states such as authentication, item, cart and order management, ensuring that state changes are efficiently handled across the app.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kirankumar-Matham96/busy-buy-app.git

   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the app: ([see React Docs for more scripts](#react-readme-file))

```bash
  npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Technologies Used

- ReactJS
- react-dom
- react-scripts
- react-router-dom
- react-redux
- redux-toolkit
- firebase
- react-toastify
- react-loader-spinner
- styled-components

## React Reference

- [ReadMe.md](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.