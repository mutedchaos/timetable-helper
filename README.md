# Timetable helper

This is a tool for helping with setting up and/or adjusting timetables. It's meant to be used primarily with NIMBY
Rails, but at least at this point nothing it does is specific to that game.

## Usage

The latest version of the tool can be accessed at https://timetable-helper.mutedchaos.com

### Individual tools

#### Setting up runs between existing ones

The idea is, that you might already have a timetable with a regular period, and want to add additional trains between
the existing ones, for, say, rush hour.

You enter two consecutive departures from the same station for the ehe existing timetable (dominant schedule), enter how
many trains you want to add, between them, and the tool will calculate the schedules and offsets to their departures.

That in itself is useful, but not very practical, so you can also set up a temporary schedule for a train you wish to
add with roughly representative departure times, and the tool will then tell you how much you need to adjust the initial
departure time to match one of the generated schedules.

If you also enter the initial departure time (which often might be at a station near the depot/yard rather than the
normal first station of the route), the tool will tell you exactly what that departure time should be to match the
generated schedules.

At this time times are entered as 24+ hour times, seconds included, without separators, such as 063000 for 06:30:00. As
schedules often reset after midnight, at this time the assumption, when it matters, is that the clock effectively goes
from 04:00:00 to 27:59:59; midnight to 03:59:59 should be avoided in general as they might produce unexpected results.

## Development

The tool is built with vite and react. You must have node.js installed for development. Versions 16-20 have been used
and appear to work.

- To install dependencies, run `npm install`.
- To start a development server, run `npm run dev`.

## Deployment

Deployment is done using github actions -- anything pushed to the `master` branch will have a docker image built and
pushed as latest to a private docker registry.

The image can then be deployed, though that does require someone to run

    kubectl rollout restart deployment timetable-helper

On the production server.

Kubernetes configuration for the app is in the (private) core2-config repository.

The production version uses a docker image built from the `Dockerfile` in the repository root. As there is no particular
need for a backend, the final image is simply a static nginx server -- the only real reason to even use docker here is
because that works well with the existing infrastructure.
