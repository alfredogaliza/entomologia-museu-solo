import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

// import "../FormAddSingleCharacteristic/FormAddSingleCharacteristic.css";

const FormAddCharacteristics = ({
  finalPath,
  field,
  title,
  setObjectList,
  nameRelationship,
  titleRelationship,
  finalRelationshipPath,
}) => {
  const initialValues = {
    [field]: "",
  };

  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api-museu-entomologiaufra.herokuapp.com/${finalRelationshipPath}`
      )
      .then((result) => {
        setOptions(result.data);
      });


  }, [finalPath, finalRelationshipPath]);

  let validationSchemaConfig = {
    //[field]: Yup.string().required("Esse valor não pode ser vazio!"),
  };

  const validationSchema = Yup.object().shape(validationSchemaConfig);

  const onSubmit = (data) => {
    axios
      .post(
        `https://api-museu-entomologiaufra.herokuapp.com/${finalPath}`,
        data
      )
      .then((response) => {
        console.log(response);
        axios
          .get(`https://api-museu-entomologiaufra.herokuapp.com/${finalPath}`)
          .then((result) => {
            setObjectList(result.data);
          });
      });
  };

  return (
    <>
      <div className="container bg-light mt-5 pt-3">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              {/* {console.log(formik)} */}

              <label className="mb-1">Pertence a {titleRelationship}:</label>
              {/* <Field
                className="form-select mb-3"
                as="select"
                name="teste"
              >
                {option.map((value, key) => {
                  return (
                    <option key={key} value={value.value.toString()}>
                      {value.label}
                    </option>
                  );
                })}
              </Field> */}
              <Field as="select" name={nameRelationship}>
                {options.map((option, key) => <option key={key} value={option.id.toString()}>{option.nome}</option>)}
              </Field>

              <label className="mb-1">{title}</label>
              <br />
              <Field
                className="form-control mb-3"
                name={field}
                placeholder="Insira a caracteristica aqui..."
              />

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormAddCharacteristics;

// field with option

// classe <- precise de filo
// Ordem <- precise de classe
// familia <- precise de ordem
// genero <- precise de familia
