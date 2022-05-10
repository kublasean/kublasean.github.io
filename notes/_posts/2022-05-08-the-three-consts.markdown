---
layout: post
title: "The Three Consts"
tag: C++
---

The const keyword in C++ can show up in three different places, each having a different meaning.

Take this class, DataHistoryManager, as an example. It's a class that uses a fixed size circular array to keep track of 
the last X pieces of data. You might design such a thing as the backing for an updating line graph displaying sensor data. 

{% highlight c++ %}
using namespace std;

class DataHistoryManager {
    public:
        DataHistoryManager(int w) : window(w) {
            data = new int [window];
            for (int i=0; i<window; i++) {
                data[i] = 0;
            }
        }

        ~DataHistoryManager {
            delete[] data;
        }

        int getLatestValue() const {
            int index = start - 1;
            if (index < 0)
                index = window - 1;
            return data[index]
        }

        void dataUpdate(const &vector<int> newValues) {
            for (const &int value : newValues) {
                data[start] = value;
                start += 1;
            }
        }

    private:
        const int window;

        int start;
        int *data;
        
};
{% endhighlight %}