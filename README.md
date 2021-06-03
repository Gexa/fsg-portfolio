This project is a Porfolio page for Ferenc Balogh, Sándor Dézsi and Gergő Boldogh, built with Next.js ReactJS SSR framework, using Docker for production.

## Download and deploy the App

First, After you've cloned this repository, build a Docker image:

```bash
cd ./fsg-portfolio
docker build . -t portfolio
```

To run the built image on port 3000: 
```bash
docker run -p 3000:3000 portfolio
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project Data structure

- All Markdown (.md) files is located under *[root]/data* directory
- All the contents use their own slugs, like '/team' => ./data/team.md etc.
- CV files are located in *./data/team/[name].md* 
- Home content is under *./data/home/*