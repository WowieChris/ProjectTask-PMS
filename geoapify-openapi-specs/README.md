# Geoapify OpenAPI Specifications

## Overview
The **Geoapify OpenAPI Specifications** repository provides detailed OpenAPI documentation for interacting with Geoapify's geolocation services. These services include routing, geocoding, map data, and more. Developers can use these specifications to generate API client libraries, explore endpoints, and integrate Geoapify's geolocation capabilities into their applications.

The Geoapify OpenAPI specifications provide a convenient way to interact with the Geoapify geolocation services, including:

- [Address Autocomplete API](https://apidocs.geoapify.com/docs/geocoding/address-autocomplete/)
- [Batch Geocoding API](https://apidocs.geoapify.com/docs/geocoding/batch/)
- [Forward Geocoding API](https://apidocs.geoapify.com/docs/geocoding/forward-geocoding/)
- [Reverse Geocoding API](https://apidocs.geoapify.com/docs/geocoding/reverse-geocoding/)
- [IP Geolocation API](https://apidocs.geoapify.com/docs/ip-geolocation/)
- [Routing API](https://apidocs.geoapify.com/docs/routing/)
- [Route Matrix API](https://apidocs.geoapify.com/docs/route-matrix/)
- [Map Matching API](https://apidocs.geoapify.com/docs/map-matching/)
- [Route Planner API](https://apidocs.geoapify.com/docs/route-planner/)
- [Isoline API](https://apidocs.geoapify.com/docs/isolines/)
- [Places API](https://apidocs.geoapify.com/docs/places/)

## Before You Start

### API Key Setup

Before using Geoapify APIs, you’ll need an API key for authentication. In the provided specs, replace the `YOUR_API_KEY` placeholder in any requests with your actual API key. You can obtain a free API key by signing up at [Geoapify](https://myprojects.geoapify.com/).

---

## How to Use the Specs

### Open Online with Swagger Editor

Alternatively, you can open the specifications directly using the **online Swagger editor**:

1. Go to [https://editor.swagger.io/](https://editor.swagger.io/).
2. Click on **File** in the top-left menu.
3. Choose **Import URL**.
4. Enter the URL of the raw OpenAPI spec file hosted in this repository. For example:

```
https://raw.githubusercontent.com/geoapify/geoapify-openapi-specs/refs/heads/main/api-specs/geocoding/forward_geocoding.yaml
```

This will load the specifications into the editor, where you can view, edit, and interact with the API.

You can also generate client code directly from the **Swagger Editor**:

1. Once the specifications are loaded, click the **Generate Client** button at the top.
2. Select the desired language from the dropdown list (e.g., `JavaScript`, `Python`, `Java`).
3. The generated client code will be downloaded as a ZIP file.

---

### Use Swagger UI Locally

You can explore the API specifications locally by using a simple HTTP server.

To get started, clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/geoapify/geoapify-openapi-specs.git
cd geoapify-openapi-specs
npm install
```

Run the following command to start the local server:

```bash
npm start
```

After running the command, the specs will be available in your browser at:

```bash
http://localhost:8080/docs/index.html
```

This will open an interactive Swagger UI, allowing you to view and interact with the OpenAPI specs for Geoapify services.

### Generating Code Locally with OpenAPI Generator

You can generate client code from the provided OpenAPI specs for different programming languages using **OpenAPI Generator**.

1. **Install OpenAPI Generator** if you don't have it:

```bash
npm install @openapitools/openapi-generator-cli -g
```

2. **Generate client code**:

```bash
openapi-generator-cli generate -i api-specs/forward_geocoding.yaml -g <language> -o ./generated-client
```

Replace `<language>` with the language of your choice (e.g., `javascript`, `python`, `java`).

For more detailed options, refer to the [OpenAPI Generator documentation](https://openapi-generator.tech/docs/generators).

---

### Running Lint and Validation

To ensure the OpenAPI specifications conform to best practices, you can run the following command to lint the API specs:

```bash
npm run lint
```

This will use **Spectral** to lint the specs against the rules defined in `ruleset.spectral.yaml`.

---

### Contributing

We welcome contributions! If you have suggestions, bug reports, or ideas for improving the specs, feel free to open an issue or submit a pull request. 

---

### License

This repository is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.