import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import Swal from "sweetalert2";

const { REACT_APP_API_URL } = process.env;

function Home() {
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const [allEvents, setAllEvents] = useState([]);

  async function handleAddEvent() {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${REACT_APP_API_URL}/api/add-event`,
      newEvent,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllEvents([...allEvents, newEvent]);

    Swal.fire({
      title: "Event Added",
      icon: "success",
      confirmButtonText: "OK",
    });
    return res;
  }

  async function handleUpdateEvent(event) {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${REACT_APP_API_URL}/api/update-event/${event.id}`,
      event,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAllEvents(
      allEvents.map((e) => (e.id === event.id ? { ...e, ...event } : e))
    );
    return res;
  }

  async function handleDeleteEvent(event) {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `${REACT_APP_API_URL}/api/delete-event/${event.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllEvents(allEvents.filter((e) => e.id !== event.id));

    return res;
  }

  function handleEventClick(event) {
    const event_id = event.event.id;

    const event_title = event.event.title;
    const event_description = event.event.extendedProps.description;
    const event_start_date = event.event.start;
    const event_end_date = event.event.end;

    Swal.fire({
      title: "Update Event",
      html: `
      <input type="text" id="event_title" class="swal2-input" value="${event_title}">
      <input type="text" id="event_description" class="swal2-input" value="${event_description}">
      <input type="datetime-local" id="event_start_date" class="swal2-input" value="${event_start_date}">
      <input type="datetime-local" id="event_end_date" class="swal2-input" value="${event_end_date}">
      `,
      focusConfirm: false,
      // delete button
      showDenyButton: true,
      denyButtonText: "Delete",
      denyButtonColor: "#d33",
      // update button
      showConfirmButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#3085d6",
      preConfirm: () => {
        return {
          id: event_id,
          name: document.getElementById("event_title").value,
          description: document.getElementById("event_description").value,
          start_date: document.getElementById("event_start_date").value,
          end_date: document.getElementById("event_end_date").value,
        };
      },
    }).then((result) => {
      if (
        result.value.title === "" ||
        result.value.description === "" ||
        result.value.start_date === "" ||
        result.value.end_date === ""
      ) {
        Swal.fire({
          title: "Please fill out all fields",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (result.isConfirmed) {
        handleUpdateEvent(result.value);
        Swal.fire({
          title: "Event Updated",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchEvents();
      } else if (result.isDenied) {
        handleDeleteEvent(result.value);
        Swal.fire({
          title: "Event Deleted",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchEvents();
      }
    });
  }

  async function fetchEvents() {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${REACT_APP_API_URL}/api/user-events/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAllEvents(res.data);
  }
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div className="p-6">
        <div className="p-2 flex flex-col items-center justify-center">
          <label htmlFor="my-modal-3" className="btn">
            Add Event
          </label>
        </div>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>

            <div className="flex flex-col items-center justify-center">
              <input
                type="text"
                placeholder="Add Title"
                className="w-72 border-2 border-gray-300 mb-2 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none "
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
              />
              <input
                type="datetime-local"
                min={new Date().toISOString().split("T")[0]}
                className="w-72 border-2 border-gray-300 mb-2 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                value={newEvent.start_date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, start_date: e.target.value })
                }
              />
              <input
                type="datetime-local"
                min={new Date().toISOString().split("T")[0]}
                className="w-72 border-2 border-gray-300 mb-2 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                value={newEvent.end_date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, end_date: e.target.value })
                }
              />

              <input
                type="text"
                className="w-72 border-2 border-gray-300 mb-2 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                placeholder="Add Description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
            </div>
            <div className="modal-action">
              <label
                htmlFor="my-modal-3"
                className="btn"
                onClick={handleAddEvent}
              >
                Add Event
              </label>
            </div>
          </div>
        </div>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={
            allEvents &&
            allEvents.map((event) => {
              return {
                title: event.name,
                description: event.description,
                start: new Date(event.start_date),
                end: new Date(event.end_date),
                id: event.id, // add the event ID to the event object
              };
            })
          }
          eventClick={(event) => handleEventClick(event)}
        />
      </div>
    </>
  );
}

export default Home;
