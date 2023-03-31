# Bug Pilot 🚀

This is a simple yet powerful bug tracking app built with ReactJS. It provides full CRUD functionality to help you efficiently track and manage bugs in your software development process.

## Features

- Create new bug reports with a title, description, and status
- View a list of all bug reports, sorted by date
- Edit existing bug reports and update their information
- Delete bug reports that are no longer relevant
- Search for specific bug reports using keywords or phrases

## ToDo's

- [x] Basic file and folder structure
- [x] Create required pages and routing
- [x] Authentication (Login, Logout, SignUp)
- [x] CRUD Operations for Project
- [x] CRUD Operations for Bugs related to any Project
- [x] UI for Bug Detail Page
- [x] Search by bug title
- [x] Sorting for bugs (only if time)
- [x] Landing Page UI
- [x] Login Page UI
- [x] Register Page UI
- [x] About Page
- [x] Contact Page
- [x] Responsiveness
- [x] Provide a description for every bug (code ready and commented since backend isn't ready yet)

#### Fixes

- [x] Project CRUD APIs need testing (beware of `/api/bug` and `/api/bug/`) issue
- [x] Bugs are not project specific
- [x] CORS error for edit and delete bug
- [x] Delete bug only working in UI (API call is working fine)

## Getting Started

To get started with the app, simply clone the repository to your local machine and install the dependencies using npm or yarn:

```sh
git clone https://github.com/ADITYAMAHAKALI/bug-tracker-frontend.git
cd bug-tracker-frontend
npm install
```

Once the dependencies are installed, you can start the app using the following command:

```sh
npm start
```

This will start the development server and open the app in your default browser. You can then start using the app to track and manage bugs in your software development process.

## Contributing

Contributions are welcome! If you find a bug or have an idea for a new feature, feel free to open an issue or submit a pull request. Please make sure to follow the code formatting and style conventions used in the app.

## License

This app is licensed under the GNU License. See the [LICENSE](./LICENSE) file for more information.

## Acknowledgments

This app was inspired by the need for a simple yet powerful bug tracking solution for software development teams. It was built with ReactJS, a popular JavaScript library for building user interfaces. Special thanks to the React community for their ongoing support and contributions.
