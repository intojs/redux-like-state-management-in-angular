The Developer's Guide to Redux-like State Management in Angular while keeping it a secret

More and more people are talking about JavaScript state management systems like Redux, MobX, Relay.
Almost every article, tutorial or talk out there has something to do with the libraries above.

Let's say you join an ongoing Angular project and you say yes, I want it, I want get inspired by Redux!

So you google around and find the @ngrx/store library which is great and you cannot wait to use it.

Then you talk to the team about not managing state in controllers, introducing concepts like actions, reducers, selectors and immutability. Depending on the team's momentum, the decision to adopt new techs can take a while.

Welcome RxJS!

You already have Reactive Extensions bundled up in your Angular application. Why not use the principles of Redux right now?

Let's build a small app which retrieves repos from Github!

Redux can be described in three fundamental principles:

1. Single source of truth

The state of your whole application is stored in an object tree within a single store.

Knowing this, let's model our data!

Our application's state has a "repos" entity which can be in a "isLoading" phase and can have many objects of type Repo loaded from Github.
Sometimes errors happen which means that our "repos" entity needs a "hasError" property.  

Let's create a store service which will hold the applications's state in a RxJS BehaviorSubject.

The store service exposes an "observe" method which, together with the "distinctUntilChanged" operator returns an observable sequence that contains only distinct contiguous elements empowering the immutable character of our state.

The second method is called "dispatch". This is the way our state gets modified. The method expects an event.
It passes the current state to that event and gets back a new one.

The store service will be a provider of the store module, being injectable app-wide.

2. State is read-only

The only way to change the state is to emit an action, an object describing what happened.

3. Changes are made with pure functions

To specify how the state tree is transformed by actions, you write pure reducers.

To implement the concepts above we will create event objects, each one having a payload and a "getNewState" method which will hold the reducer logic. The StoreEvent abstract class ensures that our future events will have consistency.

Thinking about the process of getting repos from Github, our application will handle three events: GetRepos, GetReposSuccess, GetReposError.

Getting repos

The event has no payload, it just needs to set the state's "isLoading" property to true and return a new copy of it without mutations.


Repos have been fetched successfully

This event is a bit more complicated, it receives the repos as a payload and it stores them in our state together with setting the "isLoading" and "hasError" properties to "false".

Could not retrieve repos

I know Github always works, but, let's build the error event nonetheless.

At this point, we have setup our infrastructure, having our single source of truth neatly stored away into a "BehavoirSubject" and our events ready to play!

Creating the repos service

In order to interact with Github and fetch our data, we need a service.
Because our state is decoupled from our components, we can delegate event dispatching to this very service, making it communicate with our store, essentially turning it into a thunk.

Consuming the state

Now that we the service let's consume our state and hook everything up at the component level.
We will inject our store and subscribe to the repos properties. The async pipe is really handy, making it possible to use the subscription directly at the template level.

The interesting part is how to use the RxJs operators to query our store, just like a front end database.


--- code here ---
