const Workout = require("../models/workout.js");
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const router = require('express').Router();

// writing the route to get all workouts
// route to get all workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        }, ])
        .then((workoutdb) => {
            res.json(workoutdb);
        })
        .catch((err) => {
            res.json(err);
        });
});

// create new workout
router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then((workoutdb) => {
            res.json(workoutdb);
        })
        .catch((err) => {
            res.json(err);
        });

    // add exercises
    router.put("/api/workouts/:id", ({ params, body }, res) => {

        Workout.findOneAndUpdate({ _id: params.id }, { $push: { exercises: body } }, { new: true })
            .then((workoutdb) => {
                res.json(workoutdb);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    // workouts within the last seven days
    router.get("/api/workouts/range", (req, res) => {
        Workout.aggregate([{
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration",
                    },
                },
            }, ])
            .sort({ _id: -1 })
            .limit(7)
            .then((workoutdb) => {
                console.log(workoutdb);
                res.json(workoutdb);
            })
            .catch((err) => {
                res.json(err);
            });
    });

});



module.exports = router;