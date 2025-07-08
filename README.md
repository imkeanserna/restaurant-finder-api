## Restaurant Finder API

Restaurant Finder APi An LLM-drive restaurant finder
</br>

### Setup Local
1. ```npm install```
2. Setup environment
   - Copy environment variables ```cp .env_example .env```
3. Add Code Access environment.
4. Get an Open AI Key or create account on Groq and create ```GROQ_API_KEY```.
5. Choose LLM model.
6. Create an account in [Foursquare developer](https://auth.studio.foursquare.com/u/login/identifier?state=hKFo2SBFa0NVUUNYN0tocnFsdHNFNGp4OWFEMFpsTDVTVmJGQqFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIElkRGZ5OWppWWUtbU4yaVB0YXctZENDS1hxQ0lOdkcxo2NpZNkgZFZ5NzFrNkV4ejd6Y3BJUnBRaEJoWGZTTjRvY2dqRkU) and generate service api key.

### Start the server
- Run the server with ```npm run dev```
- The server will start on http://localhost:3000

### Limitations
- Free version of Foursquare api doesn't return price, ratings, hours and etc. 
