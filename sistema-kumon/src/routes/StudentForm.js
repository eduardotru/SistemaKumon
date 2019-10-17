import React from 'react';
import '../App.css';

import { Button, Form } from 'antd'

import TextInput from '../components/TextInput'
import DateInput from '../components/DateInput'
import TextAreaInput from '../components/TextAreaInput'
import AddressForm from '../components/AddressForm'
import EmergencyContactForm from '../components/EmergencyContactForm'
import GuardiansForm from '../components/GuardiansForm'
import SchoolSelector from '../components/SchoolSelector'

import { registerStudent } from '../controllers/StudentsController'

const attributes = [
  ["name", "Nombre/s", TextInput],
  ["last_name_father", "Apellido paterno", TextInput],
  ["last_name_mother", "Apellido materno", TextInput],
  ["identifier", "Matricula", TextInput],
  ["date_of_birth", "Fecha de nacimiento", DateInput],
  ["gender", "Genero", TextInput],
  ["phone", "Telefono", TextInput],
  ["medical_instructions", "Cuestiones médicas", TextAreaInput],
];


class StudentFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (true) {
        let result = await registerStudent(
          values.name,
          values.last_name_father,
          values.last_name_mother,
          values.identifier,
          values.date_of_birth,
          values.gender,
          values.phone,
          values.medical_instructions,
          values.school_attributes,
          {
            "street_name": values.address_street_name,
            "ext_num": values.address_ext_num,
            "int_num": values.address_int_num,
            "neighborhood": values.address_neighborhood,
            "city": values.address_city,
            "state": values.address_state,
            "zipcode": values.address_zipcode,
            "between_street_a": values.address_between_street_a,
            "between_street_b": values.address_between_street_b,
          },
          {
            "name": values.emergency_contact_name,
            "phone": values.emergency_contact_phone,
            "cellphone": values.emergency_contact_cellphone,
          },
          {
            "name": values.guardians_name,
            "last_name_father": values.guardians_last_name_father,
            "last_name_mother": values.guardians_last_name_mother,
            "email": values.guardians_email,
            "phone": values.guardians_phone,
            "job": values.guardians_job,
          }
        );
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    let inputs = attributes.map(
      ([key, value, Tag]) => {
        return (
          <Tag
            key={key}
            fieldKey={key}
            name={value}
            value={this.props[key]}
            getFieldDecorator={getFieldDecorator}
          />
        );
      }
    );

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div className="Login">
        <header className="Login-header">
          <h1>Registrar Alumno</h1>
        </header>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          {inputs}
          <SchoolSelector 
            formKey="school_selector"
            getFieldDecorator={getFieldDecorator}
          />
          <GuardiansForm 
            formKey="guardians_attributes"
            getFieldDecorator={getFieldDecorator}
          />
          <AddressForm
            formKey="address_attributes"
            getFieldDecorator={getFieldDecorator}
          />
          <EmergencyContactForm
            formKey="emergency_contact_attributes"
            getFieldDecorator={getFieldDecorator}
          />
          <Button htmlType="submit">Registrar</Button>
        </Form>
      </div>
    );
  }
}


const StudentForm = Form.create({name: 'student-form'})(StudentFormComponent);
export default StudentForm;
