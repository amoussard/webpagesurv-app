{% extends 'layout.html.swig' %}

{% block title %}{% endblock %}


{% block content %}

<div class="container">
    <h1>Warning</h1>

    <table class="table">
        <thead>
            <tr>
                <th>Url</th>
                <th>Cron</th>
                <th>Text</th>
            </tr>
        </thead>
        <tbody>
            {% for watch in watchs %}
                <tr>
                    <td>{{ watch.url }}</td>
                    <td>{{ watch.cron }}</td>
                    <td>{{ watch.text }}</td>
                    <td><a href="/{{ watch._id.toString() }}">X</a></td>
                </tr>
            {% endfor %}
        </tbody>
    </table>

</div>

{% endblock %}