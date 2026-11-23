# Web Development Project 7 - *Starbound Crew*

Submitted by: **Your Name Here**

This web app: **lets you recruit a starship crew. You pick each crewmate's role (Pilot, Engineer, Medic or Scientist), which decides which suit colors, specialties and speeds they can have. The roster page lists your crew newest-first with crew statistics and a "mission success" score that changes how the roster looks. Every crewmate has their own profile page and can be edited or deleted.**

Time spent: **X** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The web app contains a page that features a create form to add a new crewmate**
  - Users can name the crewmate
  - Users can set the crewmate’s attributes by clicking on one of several values
- [x] **The web app includes a summary page of all the user’s added crewmates**
  -  The web app contains a summary page dedicated to displaying all the crewmates the user has made so far
  -  The summary page is sorted by creation date such that the most recently created crewmates appear at the top
- [x] **A previously created crewmate can be updated from the list of crewmates in the summary page**
  - Each crewmate has an edit button that will take users to an update form for the relevant crewmate
  - Users can see the current attributes of their crewmate on the update form
  - After editing the crewmate's attribute values using the form, the user can immediately see those changes reflected in the update form and on the summary page
- [x] **A previously created crewmate can be deleted from the crewmate list**
  - Using the edit form detailed in the previous _crewmates can be updated_ feature, there is a button that allows users to delete that crewmate
  - After deleting a crewmate, the crewmate should no longer be visible in the summary page
- [x] **Each crewmate has a direct, unique URL link to an info page about them**
  - Clicking on a crewmate in the summary page navigates to a detail page for that crewmate
  - The detail page contains extra information about the crewmate not included in the summary page
  - Users can navigate to the edit form from the detail page

The following **optional** features are implemented:

- [x] A crewmate can be given a category upon creation which restricts their attribute value options
  - Users choose a role (Pilot, Engineer, Medic, Scientist) before any attributes are specified
  - Based on the role, only a subset of colors, specialties and speeds can be selected; the rest are disabled
- [x] A section of the summary page displays summary statistics about a user’s crew on their crew page
  - Percent of the crew in each role and wearing each suit color
- [x] The summary page displays a custom “success” metric about a user’s crew which changes the look of the crewmate list
  - A mission success score based on role coverage, average speed, crew size and whether a Medic is aboard
  - High scores make the roster cards glow green, medium scores give them an amber border, and low scores desaturate them with dashed borders

The following **additional** features are implemented:

* [x] Each crewmate gets an avatar drawn in their suit color, which previews live on the create and edit forms
* [x] Changing a crewmate's role clears any attributes the new role doesn't allow
* [x] Detail page shows recruit date, crew ID, a field report and a "power level"
* [x] Delete asks for confirmation first
* [x] Works with Supabase when configured, otherwise falls back to browser localStorage with no setup
* [x] Friendly "not found" pages for unknown routes and crewmate IDs
* [x] Responsive layout for small screens

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Running locally

```bash
npm install
npm run dev
```

### Supabase (optional)

1. Create a Supabase project and run [`supabase/schema.sql`](supabase/schema.sql) in its SQL editor.
2. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Restart `npm run dev`. The home page shows which storage backend is active.

## Notes

Describe any challenges encountered while building the app.

