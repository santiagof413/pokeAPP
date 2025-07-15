# PokeAPP introduction
This project is a personal project that utilizes the PokeAPI to create a simple Angular application for learning purposes. It demonstrates how to fetch and display data from the PokeAPI, showcasing various Angular features such as components, services, and routing.This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

# Getting Started
## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

# About the Project
## Project Structure
The project is structured as follows:
```bash
src/
├── app/
│   ├── core/ # Core module for singleton services and shared functionality
│   ├── features/ # Feature modules for different parts of the application
│   ├── layout/ # Layout module for shared components like headers and footers
│   ├── shared/ # Shared module for reusable components, directives, and pipes
│   ├── app.component.css 
│   ├── app.component.html
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
├── index.html
├── main.ts
├── styles.css
```
## Project Features Available

Current version: **0.2.0** (2025-07-15)

- ✅ **Home Page**  
  A welcoming landing page that introduces the purpose of the app.

- ✅ **Navigation Bar**  
  A reusable navbar that allows users to navigate between the Home, Pokémon List, and other sections.

- ✅ **Pokémon List Page**  
  Displays a paginated and searchable list of Pokémon using data from the PokeAPI.

- ✅ **Pokémon Details Page**  
  Shows detailed information about a selected Pokémon, including its name, image, types, stats, abilities, and more.

- ✅ **Pokémon Abilities Page**  
  Provides detailed information about each Pokémon ability, including effects and multilingual names.

- ✅ **Pokemon abilities page**  
  Displays detailed information about each Pokémon ability, including effects and multilingual names.

## By
This project was created by **David Santiago Fernandez Dejoy**:
- [GitHub](https://github.com/santiagof413)
- [LinkedIn](https://www.linkedin.com/in/santiagof413/)