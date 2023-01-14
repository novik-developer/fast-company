import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

import api from "../../../api";
import MiltiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelecteFild from "../../common/form/selectFild";
import TextField from "../../common/form/textField";

const UserEdit = () => {
    const [user, setUser] = useState();
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState();
    const history = useHistory();
    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            const editUser = {
                ...data,
                qualities: data.qualities.map((qal) => ({
                    label: qal.name,
                    value: qal._id,
                    color: qal.color
                }))
            };
            setUser(editUser);
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = user;
        const updateData = {
            ...user,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        console.log(updateData);
        api.users.update(userId, updateData);
        history.push(`/users/${userId}`);
    };

    const handleChange = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    return (
        <>
            <div className="col-lg-6 col-md-8 offset-md-3 shadow p-4">
                <h3 className="mb-4">Редактирование пользователя</h3>
                {professions ? (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                        />
                        <TextField
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            label="Электронная почта"
                        />
                        <SelecteFild
                            defaultOption="Chooose..."
                            name="profession"
                            options={professions}
                            value={user.profession._id}
                            onChange={handleChange}
                            label="Выберите вашу профессию"
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={user.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                        />
                        <MiltiSelectField
                            options={qualities}
                            onChange={handleChange}
                            defaultValue={user.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />

                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                ) : (
                    "...Loading"
                )}
            </div>
        </>
    );
};

export default UserEdit;
