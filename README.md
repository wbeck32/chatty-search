# chatty-search
## a bot for finding ten things to buy on eBay based on certain criteria

The bot starts by asking what you want to find, then continues through the conversation flow until it has all the necessary search parameters: search_term, condition, location_pref, budget and zip_code.

Once it has all the necessary information, it submits your search_term keywords to the getSearchKeywordsRecommendation endpoint to see if there are cleaner values for your keywords. For example, if you type "bickyle" as a search term, the API will suggest "bicycle".

After that it uses the criteria you set to find new or used items either nearby or available for shipping. Items are also constrained by your budget.

Item details and photos will be displayed next to the chat window with links to the item page on eBay.


# notes

I was originally going to use [Dialogflow](https://dialogflow.com/) for this project but couldn't get it to deploy correctly on Google cloud which is a requirement for Dialogflow functions. I spent about six days trying to get it to work.

Only last night did I decide to use wit.ai and React so this project is the result of 24 consecutive hours of work.

# suggested behavior flow

Bot: Hello! What would you like to search for today?

You: I want to buy an elephant

Bot: Great! Do you want a new or used elephant?

You: used

Bot: Excellent! Let's find you a used elephant. How much do you want to spend?

You: $20

Bot: Do you want an elephant you can pick up locally or is it OK to have it shipped?

You: Shipped

Bot: So you want to have something shipped. Great. Whats your ZIP code?

You: 97210

Bot: Thanks for your ZIP code. Just give me a few moments to search.

...

Bot: Here are the top ten results that meet your criteria.

# todos

- Train the bot better
- Display the top ten results of the eBay search on the page
- Figure out how to submit search terms that are more than one word.
- Styling/look and feel


# resources

Chatbot built in [wit.ai](https://wit.ai/).

Hosting through Digital Ocean

eBay API - getSearchKeywordsRecommendation, findItemsByKeywords

https://github.com/jsdevkr/react-chatview

https://go.developer.ebay.com/api-documentation

https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
