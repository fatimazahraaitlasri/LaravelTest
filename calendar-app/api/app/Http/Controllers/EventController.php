<?php

namespace App\Http\Controllers;

use App\Models\Event;

use Illuminate\Http\Request;


class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Event::all();
        if (!$events) {
            return response()->json([
                "message" => "No events found"
            ], 404);
        }
        return $events;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required",
            "description" => "required",
            "start_date" => "required",
            "end_date" => "required",
        ]);

        $event = new Event();
        $event->name = $request->input('name');
        $event->description = $request->input('description');
        $event->start_date = $request->input('start_date');
        $event->end_date = $request->input('end_date');
        $event->user_id = auth()->user()->id;
        $event->save();

        return response()->json(['message' => 'Event created successfully', 'event' => $event], 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json([
                "message" => "No event found"
            ], 404);
        }
        return $event;
    }

    public function showByUser($id)
    {
        $event = Event::where('user_id', $id)->get();
        if (!$event) {
            return response()->json([
                "message" => "No event found"
            ], 404);
        }
        return $event;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json([
                "message" => "Event not found"
            ], 404);
        }
        $event->update($request->all());
        return response()->json([
            "message" => "Event updated",
            "event" => $event
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json([
                "message" => "Event not found"
            ], 404);
        }

        $event->delete();
        return response()->json([
            "message" => "Event deleted"
        ], 200);
    }
}
