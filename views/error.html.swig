{% extends 'layout.html.swig' %}

{% block title %}{% endblock %}


{% block content %}

<div class="container">

    <h1>{{ message }}</h1>
    <h2>{{ error.status }}</h2>
    <pre>{{ error.stack }}</pre>

</div>

{% endblock %}